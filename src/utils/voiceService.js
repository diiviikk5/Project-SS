// Production Voice Service - Deepgram STT + ElevenLabs TTS

const DEEPGRAM_API_KEY = import.meta.env.VITE_DEEPGRAM_API_KEY;
const ELEVENLABS_API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY;

// Language-specific voice IDs
// Using pre-made voices that don't count toward custom voice limit
const VOICE_IDS = {
    // Rachel - clear female English voice (pre-made)
    en: import.meta.env.VITE_ELEVENLABS_VOICE_ID_EN || 'MFZUKuGQUsGJPQjTS4wC',
    // Freya - works well with Hindi via multilingual model (pre-made)
    hi: import.meta.env.VITE_ELEVENLABS_VOICE_ID_HI || '3AMU7jXQuQa3oRvRqUmb',
};

// Get voice ID - Always use the Indian/Hindi voice for this agent
export function getVoiceId(language = 'en-IN') {
    // Using the Hindi voice (Freya/Custom) for all interactions to maintain single identity
    return VOICE_IDS.hi;
}

// ElevenLabs TTS
export class ElevenLabsTTS {
    constructor() {
        this.isPlaying = false;
    }

    async speak(text, language = 'en-IN') {
        const voiceId = getVoiceId(language);

        console.log('TTS - Language:', language, 'Voice ID:', voiceId);

        if (!ELEVENLABS_API_KEY) {
            console.warn('ElevenLabs API key not configured, using browser TTS');
            return this.browserSpeak(text, language);
        }

        try {
            this.isPlaying = true;

            const response = await fetch(
                `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'audio/mpeg',
                        'Content-Type': 'application/json',
                        'xi-api-key': ELEVENLABS_API_KEY
                    },
                    body: JSON.stringify({
                        text,
                        model_id: 'eleven_multilingual_v2',
                        voice_settings: {
                            stability: 0.5,
                            similarity_boost: 0.75
                        }
                    })
                }
            );

            if (!response.ok) {
                const errorText = await response.text();
                console.error('ElevenLabs error:', response.status, errorText);
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
            return this.browserSpeak(text, language);
        }
    }

    browserSpeak(text, language = 'en-IN') {
        return new Promise((resolve) => {
            if (!('speechSynthesis' in window)) {
                resolve();
                return;
            }

            window.speechSynthesis.cancel();

            const utterance = new SpeechSynthesisUtterance(text);
            const voices = window.speechSynthesis.getVoices();
            const voice = voices.find(v => v.lang === language) ||
                voices.find(v => v.lang.startsWith(language.split('-')[0])) ||
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

// Browser STT using Web Speech API
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

// Factory function to get STT
export function createSTT(onTranscript, onError) {
    return new BrowserSTT(onTranscript, onError);
}

// Factory function to get TTS
export function createTTS() {
    return new ElevenLabsTTS();
}
