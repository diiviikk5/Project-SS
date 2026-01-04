import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Mic,
    MicOff,
    Phone,
    PhoneOff,
    Volume2,
    VolumeX,
    Bot,
    User,
    ArrowLeft,
    Loader2,
    AlertCircle,
    Info
} from 'lucide-react';
import { useVoiceRecognition } from '../hooks/useVoiceRecognition';
import { getAIResponse, speakText } from '../utils/aiService';
import { useAppStore } from '../stores/appStore';

export default function VoiceDemo() {
    const {
        isListening,
        transcript,
        interimTranscript,
        isSupported,
        startListening,
        stopListening,
        resetTranscript
    } = useVoiceRecognition();

    const [isCallActive, setIsCallActive] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [conversation, setConversation] = useState([]);
    const [callDuration, setCallDuration] = useState(0);

    // Call duration timer
    useEffect(() => {
        let interval;
        if (isCallActive) {
            interval = setInterval(() => {
                setCallDuration(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isCallActive]);

    // Process transcript when user stops speaking
    useEffect(() => {
        if (transcript && !isListening && isCallActive) {
            handleUserMessage(transcript);
            resetTranscript();
        }
    }, [isListening, transcript, isCallActive]);

    const formatDuration = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const startCall = () => {
        setIsCallActive(true);
        setCallDuration(0);
        setConversation([]);

        // Initial greeting
        const greeting = 'नमस्ते! सरकारी साथी में आपका स्वागत है। मैं आपकी क्या सहायता कर सकता हूं?';
        setConversation([{ role: 'agent', text: greeting, time: new Date() }]);

        if (!isMuted) {
            speakText(greeting);
        }
    };

    const endCall = () => {
        setIsCallActive(false);
        stopListening();
        window.speechSynthesis.cancel();

        // Farewell message
        const farewell = 'धन्यवाद! आपका दिन शुभ हो। जय हिंद! 🙏';
        setConversation(prev => [...prev, { role: 'agent', text: farewell, time: new Date() }]);
    };

    const handleUserMessage = async (message) => {
        if (!message.trim()) return;

        // Add user message to conversation
        setConversation(prev => [...prev, { role: 'user', text: message, time: new Date() }]);
        setIsProcessing(true);

        try {
            // Get AI response
            const response = await getAIResponse(message, conversation.map(c => ({
                role: c.role === 'agent' ? 'assistant' : 'user',
                content: c.text
            })));

            // Add agent response
            setConversation(prev => [...prev, { role: 'agent', text: response, time: new Date() }]);

            // Speak response
            if (!isMuted) {
                speakText(response);
            }
        } catch (error) {
            console.error('Error getting response:', error);
        } finally {
            setIsProcessing(false);
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
        <div className="min-h-screen">
            <div className="gradient-bg" />
            <div className="grid-pattern" />

            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-gray-950/80 border-b border-gray-800/50">
                <div className="container flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                        <span>Back to Home</span>
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-saffron to-primary flex items-center justify-center">
                            <Phone className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-semibold">
                            <span className="text-saffron">Sarkari</span>
                            <span className="text-white">Saathi</span>
                        </span>
                    </div>
                    <Link to="/dashboard" className="btn btn-secondary text-sm">
                        Dashboard
                    </Link>
                </div>
            </header>

            <main className="pt-24 pb-12 px-6">
                <div className="container max-w-4xl">
                    {/* Title */}
                    <motion.div
                        className="text-center mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-3xl font-bold mb-2">Voice Demo</h1>
                        <p className="text-gray-400">
                            Experience real-time conversation with our AI agent in Hindi/English
                        </p>
                    </motion.div>

                    {/* Browser Support Warning */}
                    {!isSupported && (
                        <motion.div
                            className="card p-4 mb-6 flex items-center gap-3 border-warning/50"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <AlertCircle className="w-5 h-5 text-warning" />
                            <p className="text-sm text-warning">
                                Speech recognition is not supported in this browser. Please use Chrome or Edge for the best experience.
                            </p>
                        </motion.div>
                    )}

                    {/* Info Box */}
                    <motion.div
                        className="card p-4 mb-6 flex items-start gap-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                    >
                        <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <div className="text-sm text-gray-400">
                            <p className="mb-1"><strong className="text-gray-300">How to use:</strong></p>
                            <ol className="list-decimal list-inside space-y-1">
                                <li>Click "Start Call" to begin the demo</li>
                                <li>Click the microphone button and speak in Hindi or English</li>
                                <li>The AI agent will respond naturally</li>
                                <li>Try asking about Voter ID, property tax, or filing a complaint</li>
                            </ol>
                        </div>
                    </motion.div>

                    {/* Phone Interface */}
                    <motion.div
                        className="card overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        {/* Call Header */}
                        <div className="bg-gray-900/80 p-6 border-b border-gray-800 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-saffron to-primary flex items-center justify-center">
                                    <Bot className="w-7 h-7 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold">SarkariSaathi Agent</h3>
                                    <div className="flex items-center gap-2">
                                        {isCallActive ? (
                                            <>
                                                <span className="live-dot" />
                                                <span className="text-sm text-success">Active Call • {formatDuration(callDuration)}</span>
                                            </>
                                        ) : (
                                            <span className="text-sm text-gray-500">Ready to connect</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => setIsMuted(!isMuted)}
                                className={`btn btn-icon ${isMuted ? 'bg-error/20 text-error' : 'btn-secondary'}`}
                            >
                                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                            </button>
                        </div>

                        {/* Conversation Area */}
                        <div className="h-96 overflow-y-auto p-6 space-y-4">
                            {!isCallActive && conversation.length === 0 && (
                                <div className="h-full flex flex-col items-center justify-center text-center">
                                    <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center mb-4">
                                        <Phone className="w-10 h-10 text-gray-600" />
                                    </div>
                                    <p className="text-gray-500 mb-2">No active call</p>
                                    <p className="text-sm text-gray-600">Click "Start Call" to begin the demo</p>
                                </div>
                            )}

                            <AnimatePresence>
                                {conversation.map((msg, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                                    >
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'agent'
                                                ? 'bg-saffron/20'
                                                : 'bg-primary/20'
                                            }`}>
                                            {msg.role === 'agent'
                                                ? <Bot className="w-4 h-4 text-saffron" />
                                                : <User className="w-4 h-4 text-primary" />
                                            }
                                        </div>
                                        <div className={`max-w-[75%] rounded-2xl px-4 py-3 ${msg.role === 'agent'
                                                ? 'bg-gray-800 rounded-tl-none'
                                                : 'bg-primary/20 rounded-tr-none'
                                            }`}>
                                            <p className="text-sm text-gray-200">{msg.text}</p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {msg.time.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {/* Interim transcript */}
                            {isListening && (interimTranscript || transcript) && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex items-start gap-3 flex-row-reverse"
                                >
                                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                                        <User className="w-4 h-4 text-primary" />
                                    </div>
                                    <div className="bg-primary/10 rounded-2xl rounded-tr-none px-4 py-3 max-w-[75%]">
                                        <p className="text-sm text-gray-400 italic">{transcript}{interimTranscript}</p>
                                        <div className="flex items-center gap-1 mt-1">
                                            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                                            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                                            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Processing indicator */}
                            {isProcessing && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex items-center gap-3"
                                >
                                    <div className="w-8 h-8 rounded-full bg-saffron/20 flex items-center justify-center">
                                        <Loader2 className="w-4 h-4 text-saffron animate-spin" />
                                    </div>
                                    <div className="bg-gray-800 rounded-2xl rounded-tl-none px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-gray-400">Agent is typing</span>
                                            <span className="flex gap-1">
                                                <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" />
                                                <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                                                <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Controls */}
                        <div className="bg-gray-900/80 p-6 border-t border-gray-800">
                            <div className="flex items-center justify-center gap-6">
                                {/* Microphone Button */}
                                <motion.button
                                    onClick={toggleMic}
                                    disabled={!isCallActive || !isSupported}
                                    className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${isListening
                                            ? 'bg-error shadow-lg shadow-error/30'
                                            : 'bg-gray-700 hover:bg-gray-600'
                                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                                    whileTap={{ scale: 0.95 }}
                                    animate={isListening ? { scale: [1, 1.1, 1] } : {}}
                                    transition={{ repeat: isListening ? Infinity : 0, duration: 1 }}
                                >
                                    {isListening ? (
                                        <MicOff className="w-7 h-7 text-white" />
                                    ) : (
                                        <Mic className="w-7 h-7 text-white" />
                                    )}
                                </motion.button>

                                {/* Call Button */}
                                <motion.button
                                    onClick={isCallActive ? endCall : startCall}
                                    className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${isCallActive
                                            ? 'bg-error shadow-lg shadow-error/30'
                                            : 'bg-success shadow-lg shadow-success/30'
                                        }`}
                                    whileTap={{ scale: 0.95 }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    {isCallActive ? (
                                        <PhoneOff className="w-8 h-8 text-white" />
                                    ) : (
                                        <Phone className="w-8 h-8 text-white" />
                                    )}
                                </motion.button>

                                {/* Waveform Placeholder */}
                                <div className="w-16 h-16 flex items-center justify-center">
                                    {isListening && (
                                        <div className="flex items-end h-8 gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    className="w-1 bg-primary rounded-full"
                                                    animate={{ height: [10, 25, 10] }}
                                                    transition={{
                                                        repeat: Infinity,
                                                        duration: 0.5,
                                                        delay: i * 0.1,
                                                        ease: "easeInOut"
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <p className="text-center text-sm text-gray-500 mt-4">
                                {isCallActive
                                    ? isListening
                                        ? 'Listening... Speak now'
                                        : 'Click microphone to speak'
                                    : 'Click the green button to start a call'
                                }
                            </p>
                        </div>
                    </motion.div>

                    {/* Sample Queries */}
                    <motion.div
                        className="mt-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <h3 className="text-sm font-medium text-gray-400 mb-4">Try asking:</h3>
                        <div className="flex flex-wrap gap-2">
                            {[
                                'मुझे अपने वोटर आईडी का स्टेटस जानना है',
                                'What is my property tax amount?',
                                'I want to file a complaint about road repair',
                                'मेरा polling booth कहां है?',
                                'How do I get a birth certificate?',
                            ].map((query) => (
                                <button
                                    key={query}
                                    onClick={() => isCallActive && handleUserMessage(query)}
                                    disabled={!isCallActive}
                                    className="px-3 py-2 text-sm bg-gray-800/50 border border-gray-700 rounded-lg hover:bg-gray-800 hover:border-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {query}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
