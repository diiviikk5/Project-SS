import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Mic,
    MicOff,
    Phone,
    PhoneOff,
    Volume2,
    VolumeX,
    ArrowLeft,
    Loader2,
    AlertCircle,
    PhoneCall,
    User,
    Clock,
    Signal,
    Wifi,
    Battery,
    Pause,
    BarChart3,
    Settings,
    AlertTriangle
} from 'lucide-react';
import { createSTT, createTTS } from '../utils/voiceService';
import { getAIResponse } from '../utils/aiService';

const translations = {
    'en-IN': {
        name: 'SarkariSaathi',
        helpline: 'Government Helpline',
        agentType: 'AI Voice Calling Agent',
        tapToStart: 'Tap to start call',
        connecting: 'Connecting...',
        connected: 'Connected',
        agentSpeaking: 'Agent Speaking',
        listening: 'Listening...',
        processing: 'Processing...',
        home: 'Home',
        dashboard: 'Dashboard',
        back: 'Back',
        mute: 'Mute',
        unmute: 'Unmute',
        speaker: 'Speaker',
        options: 'Options',
        endCall: 'End Call',
        tapToSpeak: 'Tap microphone to speak',
        agentSaid: 'Agent said:',
        youSaid: 'You said:',
        callEnded: 'Call Ended',
        duration: 'Duration:',
        thankYou: 'Thank you for using SarkariSaathi',
        transcript: 'Call Transcript',
        agentLabel: 'Agent',
        youLabel: 'You'
    },
    'hi-IN': {
        name: 'सरकारी साथी',
        helpline: 'सरकारी हेल्पलाइन',
        agentType: 'एआई वॉयस कॉलिंग एजेंट',
        tapToStart: 'कॉल शुरू करने के लिए टैप करें',
        connecting: 'कनेक्ट हो रहा है...',
        connected: 'जुड़ा हुआ है',
        agentSpeaking: 'एजेंट बोल रहा है',
        listening: 'सुन रहा हूँ...',
        processing: 'प्रोसेसिंग...',
        home: 'होम',
        dashboard: 'डैशबोर्ड',
        back: 'वापस',
        mute: 'म्यूट',
        unmute: 'अनम्यूट',
        speaker: 'स्पीकर',
        options: 'विकल्प',
        endCall: 'काट दें',
        tapToSpeak: 'बोलने के लिए माइक दबाएं',
        agentSaid: 'एजेंट ने कहा:',
        youSaid: 'आपने कहा:',
        callEnded: 'कॉल समाप्त',
        duration: 'समय:',
        thankYou: 'सरकारी साथी का उपयोग करने के लिए धन्यवाद',
        transcript: 'कॉल ट्रांसक्रिप्ट',
        agentLabel: 'एजेंट',
        youLabel: 'आप'
    }
};

export default function VoiceDemo() {
    // Call state
    const [callState, setCallState] = useState('idle'); // idle, ringing, connected, ended
    const [callDuration, setCallDuration] = useState(0);
    const [error, setError] = useState(null);

    // Voice state
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [interimTranscript, setInterimTranscript] = useState('');

    // Settings
    const [isMuted, setIsMuted] = useState(false);
    const [isSpeakerOn, setIsSpeakerOn] = useState(true);
    const [language, setLanguage] = useState('en-IN');

    // Call log
    const [callLog, setCallLog] = useState([]);
    const conversationRef = useRef([]);

    // Lock language at call start - prevents mid-call switches
    const callLanguageRef = useRef('en-IN');

    // Services
    const sttRef = useRef(null);
    const ttsRef = useRef(null);

    // Initialize TTS
    useEffect(() => {
        ttsRef.current = createTTS();
    }, []);

    // Call duration timer
    useEffect(() => {
        let interval;
        if (callState === 'connected') {
            interval = setInterval(() => setCallDuration(prev => prev + 1), 1000);
        }
        return () => clearInterval(interval);
    }, [callState]);

    const formatDuration = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const addToLog = (speaker, text) => {
        const entry = {
            speaker,
            text,
            time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        };
        setCallLog(prev => [...prev, entry]);
        conversationRef.current.push({
            role: speaker === 'agent' ? 'assistant' : 'user',
            content: text
        });
    };

    const handleTranscript = useCallback((text, isFinal) => {
        if (isFinal) {
            setTranscript(text);
            setInterimTranscript('');
            // Process the final transcript
            processUserSpeech(text);
        } else {
            setInterimTranscript(text);
        }
    }, []);

    const handleSTTError = useCallback((error) => {
        console.error('STT Error:', error);
        setError(`Speech recognition error: ${error}`);
        setIsListening(false);
    }, []);

    const initiateCall = async () => {
        setError(null);
        setCallState('ringing');
        setCallLog([]);
        setCallDuration(0);
        conversationRef.current = [];

        // Lock language at call start - cannot change during call
        callLanguageRef.current = language;

        // Simulate ringing
        await new Promise(resolve => setTimeout(resolve, 1500));

        setCallState('connected');

        // Agent greeting based on locked language
        const isHindi = callLanguageRef.current.startsWith('hi');
        const greeting = isHindi
            ? "नमस्ते! सरकारी साथी हेल्पलाइन में आपका स्वागत है। मैं आपकी कैसे मदद कर सकता हूं?"
            : "Thank you for calling SarkariSaathi government helpline. How may I assist you today?";
        addToLog('agent', greeting);

        if (isSpeakerOn && ttsRef.current) {
            setIsSpeaking(true);
            try {
                await ttsRef.current.speak(greeting, callLanguageRef.current);
            } catch (e) {
                console.error('TTS error:', e);
            }
            setIsSpeaking(false);
        }
    };

    const endCall = () => {
        // Cleanup
        if (sttRef.current) {
            sttRef.current.stop();
            sttRef.current = null;
        }
        if (ttsRef.current) {
            ttsRef.current.stop();
        }

        setIsListening(false);
        setIsSpeaking(false);
        setCallState('ended');

        setTimeout(() => setCallState('idle'), 3000);
    };

    const startListening = async () => {
        if (isMuted || isProcessing || isSpeaking) return;

        setError(null);

        // Create new STT instance
        sttRef.current = createSTT(handleTranscript, handleSTTError);

        const success = await sttRef.current.start(callLanguageRef.current);
        if (success) {
            setIsListening(true);
            setTranscript('');
            setInterimTranscript('');
        }
    };

    const stopListening = () => {
        if (sttRef.current) {
            sttRef.current.stop();
        }
        setIsListening(false);
    };

    const processUserSpeech = async (message) => {
        if (!message.trim()) return;

        stopListening();
        addToLog('user', message);
        setIsProcessing(true);

        try {
            const response = await getAIResponse(message, conversationRef.current, callLanguageRef.current);
            addToLog('agent', response);

            if (isSpeakerOn && ttsRef.current) {
                setIsSpeaking(true);
                await ttsRef.current.speak(response, callLanguageRef.current);
                setIsSpeaking(false);
            }
        } catch (err) {
            console.error('AI Error:', err);
            setError(err.message);
        } finally {
            setIsProcessing(false);
            setTranscript('');
        }
    };

    const toggleMic = () => {
        if (isListening) {
            stopListening();
        } else {
            startListening();
        }
    };

    return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
            <div className="gradient-bg" />

            {/* Phone Device */}
            <motion.div
                className="relative w-full max-w-sm"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                {/* Navigation */}
                <div className="absolute -top-16 left-0 right-0 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                        <span>{translations[language].home}</span>
                    </Link>
                    <Link to="/dashboard" className="btn btn-secondary btn-sm">
                        <BarChart3 className="w-4 h-4" />
                        {translations[language].dashboard}
                    </Link>
                </div>

                {/* Phone Frame */}
                <div className="bg-gray-900 rounded-[3rem] p-3 shadow-2xl border border-gray-800">
                    <div className="bg-black rounded-[2.5rem] overflow-hidden">
                        {/* Status Bar */}
                        <div className="px-8 py-3 flex items-center justify-between text-white text-xs">
                            <span className="font-medium">
                                {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            <div className="flex items-center gap-1.5">
                                <Signal className="w-4 h-4" />
                                <Wifi className="w-4 h-4" />
                                <Battery className="w-5 h-5" />
                            </div>
                        </div>

                        {/* Main Screen */}
                        <div className="px-6 pb-6 min-h-[580px] flex flex-col">

                            {/* Error Banner */}
                            <AnimatePresence>
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="bg-rose-500/20 border border-rose-500/30 rounded-xl p-3 mb-4 flex items-start gap-2"
                                    >
                                        <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-sm text-rose-200">{error}</p>
                                            <button
                                                onClick={() => setError(null)}
                                                className="text-xs text-rose-400 hover:text-rose-300 mt-1"
                                            >
                                                Dismiss
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* IDLE STATE */}
                            {callState === 'idle' && (
                                <motion.div
                                    className="flex-1 flex flex-col items-center justify-center text-center"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <div className="w-28 h-28 rounded-full bg-gradient-to-br from-saffron to-primary flex items-center justify-center mb-6 shadow-2xl">
                                        <PhoneCall className="w-14 h-14 text-white" />
                                    </div>

                                    <h2 className="text-2xl font-bold text-white mb-2">{translations[language].name}</h2>
                                    <p className="text-gray-400 text-sm mb-1">{translations[language].helpline}</p>
                                    <p className="text-gray-500 text-xs mb-8">{translations[language].agentType}</p>

                                    {/* Language Selection */}
                                    <div className="flex gap-2 mb-8">
                                        <button
                                            onClick={() => setLanguage('en-IN')}
                                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${language === 'en-IN'
                                                ? 'bg-primary text-white'
                                                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                                }`}
                                        >
                                            English
                                        </button>
                                        <button
                                            onClick={() => setLanguage('hi-IN')}
                                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${language === 'hi-IN'
                                                ? 'bg-primary text-white'
                                                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                                }`}
                                        >
                                            हिंदी
                                        </button>
                                    </div>

                                    {/* Call Button */}
                                    <motion.button
                                        onClick={initiateCall}
                                        className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Phone className="w-10 h-10 text-white" />
                                    </motion.button>
                                    <p className="text-gray-500 text-xs mt-4">{translations[language].tapToStart}</p>
                                </motion.div>
                            )}

                            {/* RINGING STATE */}
                            {callState === 'ringing' && (
                                <motion.div
                                    className="flex-1 flex flex-col items-center justify-center text-center"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <motion.div
                                        className="w-28 h-28 rounded-full bg-gradient-to-br from-saffron to-primary flex items-center justify-center mb-6"
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ duration: 1, repeat: Infinity }}
                                    >
                                        <PhoneCall className="w-14 h-14 text-white" />
                                    </motion.div>

                                    <h2 className="text-xl font-bold text-white mb-2">{translations[language].connecting}</h2>
                                    <p className="text-gray-400 text-sm">{translations[language].name} {translations[language].helpline}</p>

                                    <div className="mt-8 flex gap-1.5">
                                        <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" />
                                        <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                                        <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                                    </div>

                                    <motion.button
                                        onClick={endCall}
                                        className="w-16 h-16 rounded-full bg-rose-500 flex items-center justify-center mt-12"
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <PhoneOff className="w-8 h-8 text-white" />
                                    </motion.button>
                                </motion.div>
                            )}

                            {/* CONNECTED STATE */}
                            {callState === 'connected' && (
                                <motion.div
                                    className="flex-1 flex flex-col"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    {/* Call Header */}
                                    <div className="text-center py-4 border-b border-gray-800">
                                        <div className="flex items-center justify-center gap-2 text-emerald-400 text-sm mb-1">
                                            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                                            <span>{translations[callLanguageRef.current].connected}</span>
                                        </div>
                                        <h3 className="text-lg font-semibold text-white">{translations[callLanguageRef.current].name}</h3>
                                        <p className="text-2xl font-mono text-white mt-1">{formatDuration(callDuration)}</p>
                                    </div>

                                    {/* Call Activity Display */}
                                    <div className="flex-1 flex flex-col items-center justify-center py-8">
                                        {/* Speaking Indicator */}
                                        {isSpeaking && (
                                            <motion.div
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                className="text-center"
                                            >
                                                <motion.div
                                                    className="w-24 h-24 rounded-full bg-saffron/20 flex items-center justify-center mx-auto mb-3"
                                                    animate={{ scale: [1, 1.15, 1] }}
                                                    transition={{ duration: 0.8, repeat: Infinity }}
                                                >
                                                    <Volume2 className="w-12 h-12 text-saffron" />
                                                </motion.div>
                                                <p className="text-saffron font-medium">{translations[callLanguageRef.current].agentSpeaking}</p>
                                            </motion.div>
                                        )}

                                        {/* Processing Indicator */}
                                        {isProcessing && !isSpeaking && (
                                            <motion.div
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                className="text-center"
                                            >
                                                <div className="w-24 h-24 rounded-full bg-gray-800 flex items-center justify-center mx-auto mb-3">
                                                    <Loader2 className="w-12 h-12 text-gray-400 animate-spin" />
                                                </div>
                                                <p className="text-gray-400 font-medium">{translations[callLanguageRef.current].processing}</p>
                                            </motion.div>
                                        )}

                                        {/* Listening Indicator */}
                                        {isListening && (
                                            <motion.div
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                className="text-center"
                                            >
                                                <motion.div
                                                    className="w-24 h-24 rounded-full bg-rose-500/20 flex items-center justify-center mx-auto mb-3"
                                                    animate={{ scale: [1, 1.15, 1] }}
                                                    transition={{ duration: 1, repeat: Infinity }}
                                                >
                                                    <Mic className="w-12 h-12 text-rose-400" />
                                                </motion.div>
                                                <p className="text-rose-400 font-medium mb-2">{translations[callLanguageRef.current].listening}</p>
                                                {(transcript || interimTranscript) && (
                                                    <p className="text-gray-400 text-sm max-w-[200px] mx-auto">
                                                        "{transcript || interimTranscript}"
                                                    </p>
                                                )}
                                            </motion.div>
                                        )}

                                        {/* Idle State */}
                                        {!isSpeaking && !isProcessing && !isListening && (
                                            <div className="text-center">
                                                <div className="w-20 h-20 rounded-full bg-gray-800/50 flex items-center justify-center mx-auto mb-3">
                                                    <User className="w-10 h-10 text-gray-500" />
                                                </div>
                                                <p className="text-gray-500 text-sm">{translations[callLanguageRef.current].tapToSpeak}</p>
                                            </div>
                                        )}

                                        {/* Last Message */}
                                        {callLog.length > 0 && !isListening && (
                                            <div className="mt-6 px-4 w-full">
                                                <div className="bg-gray-800/40 rounded-xl p-3 text-center">
                                                    <p className="text-xs text-gray-500 mb-1">
                                                        {callLog[callLog.length - 1]?.speaker === 'agent'
                                                            ? translations[callLanguageRef.current].agentSaid
                                                            : translations[callLanguageRef.current].youSaid}
                                                    </p>
                                                    <p className="text-gray-300 text-sm line-clamp-2">
                                                        {callLog[callLog.length - 1]?.text}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Controls */}
                                    <div className="py-6 border-t border-gray-800">
                                        {/* Secondary Controls */}
                                        <div className="grid grid-cols-3 gap-4 mb-6">
                                            <button
                                                onClick={() => setIsMuted(!isMuted)}
                                                className={`flex flex-col items-center gap-1.5 p-3 rounded-xl transition-colors ${isMuted ? 'bg-rose-500/20 text-rose-400' : 'text-gray-400 hover:bg-gray-800'
                                                    }`}
                                            >
                                                {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                                                <span className="text-xs">{isMuted ? translations[callLanguageRef.current].unmute : translations[callLanguageRef.current].mute}</span>
                                            </button>

                                            <button
                                                onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                                                className={`flex flex-col items-center gap-1.5 p-3 rounded-xl transition-colors ${isSpeakerOn ? 'bg-primary/20 text-primary-light' : 'text-gray-400 hover:bg-gray-800'
                                                    }`}
                                            >
                                                {isSpeakerOn ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
                                                <span className="text-xs">{translations[callLanguageRef.current].speaker}</span>
                                            </button>

                                            <button className="flex flex-col items-center gap-1.5 p-3 rounded-xl text-gray-400 hover:bg-gray-800 transition-colors">
                                                <Settings className="w-6 h-6" />
                                                <span className="text-xs">{translations[callLanguageRef.current].options}</span>
                                            </button>
                                        </div>

                                        {/* Main Controls */}
                                        <div className="flex items-center justify-center gap-8">
                                            {/* Push to Talk */}
                                            <motion.button
                                                onClick={toggleMic}
                                                disabled={isProcessing || isSpeaking || isMuted}
                                                className={`w-16 h-16 rounded-full flex items-center justify-center transition-all disabled:opacity-50 ${isListening
                                                    ? 'bg-rose-500 shadow-lg shadow-rose-500/30'
                                                    : 'bg-gray-700 hover:bg-gray-600'
                                                    }`}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                {isListening ? <MicOff className="w-7 h-7 text-white" /> : <Mic className="w-7 h-7 text-white" />}
                                            </motion.button>

                                            {/* End Call */}
                                            <motion.button
                                                onClick={endCall}
                                                className="w-16 h-16 rounded-full bg-rose-500 flex items-center justify-center shadow-lg shadow-rose-500/30"
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <PhoneOff className="w-7 h-7 text-white" />
                                            </motion.button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* ENDED STATE */}
                            {callState === 'ended' && (
                                <motion.div
                                    className="flex-1 flex flex-col items-center justify-center text-center"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center mb-6">
                                        <PhoneOff className="w-10 h-10 text-gray-500" />
                                    </div>

                                    <h2 className="text-xl font-bold text-white mb-2">{translations[callLanguageRef.current].callEnded}</h2>
                                    <p className="text-gray-400 text-sm mb-1">{translations[callLanguageRef.current].duration} {formatDuration(callDuration)}</p>
                                    <p className="text-gray-500 text-xs mt-4">{translations[callLanguageRef.current].thankYou}</p>
                                </motion.div>
                            )}
                        </div>

                        {/* Home Indicator */}
                        <div className="flex justify-center pb-2">
                            <div className="w-32 h-1 bg-gray-600 rounded-full" />
                        </div>
                    </div>
                </div>

                {/* Call Log Sidebar */}
                {callState === 'connected' && callLog.length > 0 && (
                    <motion.div
                        className="absolute -right-80 top-0 w-72 card p-4 hidden xl:block max-h-[600px] overflow-hidden"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {translations[callLanguageRef.current].transcript}
                        </h4>
                        <div className="space-y-3 overflow-y-auto max-h-[520px] pr-2">
                            {callLog.map((entry, i) => (
                                <div key={i} className="text-sm">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={`text-xs font-semibold ${entry.speaker === 'agent' ? 'text-saffron' : 'text-primary-light'
                                            }`}>
                                            {entry.speaker === 'agent'
                                                ? translations[callLanguageRef.current].agentLabel
                                                : translations[callLanguageRef.current].youLabel}
                                        </span>
                                        <span className="text-xs text-gray-500">{entry.time}</span>
                                    </div>
                                    <p className="text-gray-300">{entry.text}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}
