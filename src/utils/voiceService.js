// Production Voice Service - Deepgram STT + ElevenLabs TTS

const DEEPGRAM_API_KEY = import.meta.env.VITE_DEEPGRAM_API_KEY;
const ELEVENLABS_API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY;
const ELEVENLABS_VOICE_ID = import.meta.env.VITE_ELEVENLABS_VOICE_ID || 'pNInz6obpgDQGcFmaJgB';

// Deepgram Real-time STT
export class DeepgramSTT {
    constructor(onTranscript, onError) {
        this.socket = null;
        this.mediaRecorder = null;
        this.onTranscript = onTranscript;
        this.onError = onError;
        this.isListening = false;
    }

    async start(language = 'en-IN') {
        if (!DEEPGRAM_API_KEY) {
            this.onError?.('Deepgram API key not configured');
            return false;
        }

        try {
            // Get microphone access
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    channelCount: 1,
                    sampleRate: 16000,
                    echoCancellation: true,
                    noiseSuppression: true
                }
            });

            // Connect to Deepgram WebSocket
            const wsUrl = `wss://api.deepgram.com/v1/listen?` +
                `model=nova-2&` +
                `language=${language}&` +
                `smart_format=true&` +
                `interim_results=true&` +
                `utterance_end_ms=1500&` +
                `vad_events=true&` +
                `endpointing=300`;

            this.socket = new WebSocket(wsUrl, ['token', DEEPGRAM_API_KEY]);

            this.socket.onopen = () => {
                console.log('Deepgram connected');
                this.isListening = true;

                // Start recording and sending audio
                this.mediaRecorder = new MediaRecorder(stream, {
                    mimeType: 'audio/webm;codecs=opus'
                });

                this.mediaRecorder.addEventListener('dataavailable', (event) => {
                    if (event.data.size > 0 && this.socket?.readyState === WebSocket.OPEN) {
                        this.socket.send(event.data);
                    }
                });

                this.mediaRecorder.start(250);
            };

            this.socket.onmessage = (event) => {
                const data = JSON.parse(event.data);

                if (data.type === 'Results' && data.channel?.alternatives?.[0]) {
                    const transcript = data.channel.alternatives[0].transcript;
                    const isFinal = data.is_final;

                    if (transcript) {
                        this.onTranscript?.(transcript, isFinal);
                    }
                }
            };

            this.socket.onerror = (error) => {
                console.error('Deepgram error:', error);
                this.onError?.('Speech recognition error');
            };

            this.socket.onclose = () => {
                console.log('Deepgram disconnected');
                this.isListening = false;
            };

            return true;
        } catch (error) {
            console.error('Failed to start Deepgram:', error);
            this.onError?.(error.message);
            return false;
        }
    }

    stop() {
        if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
            this.mediaRecorder.stop();
            this.mediaRecorder.stream.getTracks().forEach(track => track.stop());
        }

        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify({ type: 'CloseStream' }));
            this.socket.close();
        }

        this.isListening = false;
    }
}

// ElevenLabs TTS with streaming
export class ElevenLabsTTS {
    constructor() {
        this.audioContext = null;
        this.currentSource = null;
        this.isPlaying = false;
    }

    async speak(text, voiceId = ELEVENLABS_VOICE_ID) {
        if (!ELEVENLABS_API_KEY) {
            console.warn('ElevenLabs API key not configured, using browser TTS');
            return this.browserSpeak(text);
        }

        try {
            this.isPlaying = true;

            const response = await fetch(
                `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`,
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'audio/mpeg',
                        'Content-Type': 'application/json',
                        'xi-api-key': ELEVENLABS_API_KEY
                    },
                    body: JSON.stringify({
                        text,
                        model_id: 'eleven_turbo_v2',
                        voice_settings: {
                            stability: 0.5,
                            similarity_boost: 0.8,
                            style: 0.5,
                            use_speaker_boost: true
                        }
                    })
                }
            );

            if (!response.ok) {
                throw new Error(`ElevenLabs API error: ${response.status}`);
            }

            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);

            return new Promise((resolve, reject) => {
                audio.onended = () => {
                    URL.revokeObjectURL(audioUrl);
                    this.isPlaying = false;
                    resolve();
                };
                audio.onerror = (e) => {
                    URL.revokeObjectURL(audioUrl);
                    this.isPlaying = false;
                    reject(e);
                };
                audio.play().catch(reject);
            });
        } catch (error) {
            console.error('ElevenLabs TTS error:', error);
            this.isPlaying = false;
            return this.browserSpeak(text);
        }
    }

    browserSpeak(text) {
        return new Promise((resolve) => {
            if (!('speechSynthesis' in window)) {
                resolve();
                return;
            }

            window.speechSynthesis.cancel();

            const utterance = new SpeechSynthesisUtterance(text);
            const voices = window.speechSynthesis.getVoices();
            const voice = voices.find(v => v.lang === 'en-IN') ||
                voices.find(v => v.lang.startsWith('en')) ||
                voices[0];

            if (voice) utterance.voice = voice;
            utterance.rate = 0.95;
            utterance.onend = resolve;
            utterance.onerror = resolve;

            window.speechSynthesis.speak(utterance);
        });
    }

    stop() {
        window.speechSynthesis.cancel();
        this.isPlaying = false;
    }
}

// Browser fallback STT using Web Speech API
export class BrowserSTT {
    constructor(onTranscript, onError) {
        this.recognition = null;
        this.onTranscript = onTranscript;
        this.onError = onError;
        this.isListening = false;

        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();
            this.recognition.continuous = true;
            this.recognition.interimResults = true;

            this.recognition.onresult = (event) => {
                let finalTranscript = '';
                let interimTranscript = '';

                for (let i = event.resultIndex; i < event.results.length; i++) {
                    const transcript = event.results[i][0].transcript;
                    if (event.results[i].isFinal) {
                        finalTranscript += transcript;
                    } else {
                        interimTranscript += transcript;
                    }
                }

                if (finalTranscript) {
                    this.onTranscript?.(finalTranscript, true);
                } else if (interimTranscript) {
                    this.onTranscript?.(interimTranscript, false);
                }
            };

            this.recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                this.onError?.(event.error);
            };

            this.recognition.onend = () => {
                this.isListening = false;
            };
        }
    }

    start(language = 'en-IN') {
        if (!this.recognition) {
            this.onError?.('Speech recognition not supported');
            return false;
        }

        this.recognition.lang = language;
        this.recognition.start();
        this.isListening = true;
        return true;
    }

    stop() {
        if (this.recognition) {
            this.recognition.stop();
        }
        this.isListening = false;
    }
}

// Factory function to get best available STT
export function createSTT(onTranscript, onError) {
    if (DEEPGRAM_API_KEY) {
        return new DeepgramSTT(onTranscript, onError);
    }
    return new BrowserSTT(onTranscript, onError);
}

// Factory function to get best available TTS
export function createTTS() {
    return new ElevenLabsTTS();
}
