import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mic, MicOff, X, Loader2, Signal, ChevronLeft, BarChart2 } from 'lucide-react';
import { vapiService } from '../utils/vapiService';
import { Link } from 'react-router-dom';

const EqualizerBar = ({ color, delay, isAnimating, volume }) => {
    // Generate random height based on volume or idle animation
    const randomHeight = isAnimating
        ? Math.max(20, Math.random() * 150 * (volume * 5 + 0.2))
        : [20, 40, 20]; // Idle breathing

    return (
        <motion.div
            className={`w-3 md:w-4 rounded-full ${color}`}
            animate={{
                height: randomHeight,
                opacity: isAnimating ? 1 : 0.7
            }}
            transition={{
                duration: 0.2,
                repeat: isAnimating ? 0 : Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: delay
            }}
        />
    );
};

export default function DemoCall() {
    const [callStatus, setCallStatus] = useState('idle'); // idle, connecting, active, ended, error
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(0);
    const [transcript, setTranscript] = useState([]);
    const [activeSpeaker, setActiveSpeaker] = useState('none');
    const messagesEndRef = useRef(null);

    const ASSISTANT_ID = '388dffb8-7d98-4c66-a846-e1d94128ec2e';

    useEffect(() => {
        const onCallStart = () => setCallStatus('active');
        const onCallEnd = () => {
            setCallStatus('idle'); // Reset to idle to allow calling again
            setVolume(0);
            setActiveSpeaker('none');
        };
        const onVolumeLevel = (level) => {
            setVolume(level);
            if (level > 0.05) setActiveSpeaker('active'); // simplified active state
        };
        const onMessage = (message) => {
            if (message.type === 'transcript' && message.transcriptType === 'final') {
                setTranscript(prev => [...prev, {
                    role: message.role,
                    text: message.transcript,
                    timestamp: new Date().toLocaleTimeString()
                }]);
            }
        };
        const onError = (error) => {
            console.error('Vapi Error:', error);
            setCallStatus('error');
        };

        vapiService.on('call-start', onCallStart);
        vapiService.on('call-end', onCallEnd);
        vapiService.on('volume-level', onVolumeLevel);
        vapiService.on('message', onMessage);
        vapiService.on('error', onError);

        return () => {
            vapiService.off('call-start', onCallStart);
            vapiService.off('call-end', onCallEnd);
            vapiService.off('volume-level', onVolumeLevel);
            vapiService.off('message', onMessage);
            vapiService.off('error', onError);
        };
    }, []);

    const startCall = async () => {
        setCallStatus('connecting');
        try {
            await vapiService.startCall(ASSISTANT_ID);
        } catch (err) {
            console.error(err);
            setCallStatus('error');
        }
    };

    const endCall = () => {
        vapiService.stopCall();
    };

    const toggleMute = () => {
        const newMutedState = !isMuted;
        vapiService.vapi.setMuted(newMutedState);
        setIsMuted(newMutedState);
    };

    // Colors for the "GovTech but cool" palette
    const barColors = [
        "bg-emerald-400", "bg-emerald-500",
        "bg-cyan-400", "bg-cyan-500",
        "bg-blue-500", "bg-indigo-500",
        "bg-violet-500", "bg-fuchsia-500",
        "bg-saffron", "bg-orange-500",
        "bg-amber-400", "bg-yellow-400"
    ];

    // Create a mirrored array of bars for the visualizer
    const bars = [...barColors, ...barColors.reverse(), ...barColors];

    return (
        <div className="relative min-h-screen w-full bg-[#020202] text-white overflow-hidden font-sans selection:bg-saffron/30 flex flex-col">
            {/* Dot Grid Background */}
            <div className="absolute inset-0 z-0 opacity-10"
                style={{
                    backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)',
                    backgroundSize: '24px 24px'
                }}
            />

            {/* Header */}
            <nav className="relative z-50 p-6 flex justify-between items-center max-w-7xl mx-auto w-full">
                <Link to="/" className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                    <ChevronLeft className="w-5 h-5" />
                    <span className="font-medium">Back</span>
                </Link>
                <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                    <div className={`w-2 h-2 rounded-full ${callStatus === 'active' ? 'bg-emerald-500 animate-pulse' : 'bg-gray-500'}`} />
                    <span className="text-xs font-mono tracking-widest uppercase text-gray-300">
                        {callStatus === 'active' ? 'LIVE AUDIO' : 'READY'}
                    </span>
                </div>
            </nav>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col items-center justify-center relative z-10 w-full max-w-4xl mx-auto px-4 pb-32">

                {/* Agent Status Text */}
                <div className="mb-12 text-center space-y-4">
                    {callStatus === 'idle' && (
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500"
                        >
                            Talk to SarkariSaathi
                        </motion.h1>
                    )}

                    {callStatus === 'connecting' && (
                        <div className="flex flex-col items-center gap-4">
                            <Loader2 className="w-12 h-12 text-saffron animate-spin" />
                            <span className="text-xl text-gray-400">Establishing Secure Line...</span>
                        </div>
                    )}

                    {callStatus === 'active' && (
                        <div className="space-y-6">
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                                className="text-2xl md:text-4xl font-medium text-white/90 leading-relaxed max-w-2xl mx-auto"
                            >
                                {/* Show only the user's last spoken phrase */}
                                {(() => {
                                    const lastUserMessage = [...transcript].reverse().find(m => m.role === 'user');
                                    return lastUserMessage ? lastUserMessage.text : "Listening to you...";
                                })()}
                            </motion.div>
                        </div>
                    )}
                </div>

                {/* Central Action Button (The Pill) */}
                <div className="relative z-50">
                    {callStatus === 'idle' ? (
                        <button
                            onClick={startCall}
                            className="group relative flex items-center gap-4 px-10 py-5 bg-[#F5F5F7] text-black rounded-full text-xl font-bold tracking-tight hover:scale-105 transition-all duration-300 shadow-[0_0_50px_-10px_rgba(255,255,255,0.3)]"
                        >
                            <span>Start Conversation</span>
                            <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center group-hover:rotate-12 transition-transform">
                                <Mic className="w-4 h-4 text-white" />
                            </div>
                        </button>
                    ) : callStatus === 'active' ? (
                        <div className="flex items-center gap-4 p-2 bg-[#1A1A1A] border border-white/10 rounded-full backdrop-blur-xl">
                            <button
                                onClick={toggleMute}
                                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${isMuted ? 'bg-white text-black' : 'bg-white/10 text-white hover:bg-white/20'
                                    }`}
                            >
                                {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                            </button>
                            <button
                                onClick={endCall}
                                className="px-8 h-14 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/20 font-medium transition-all flex items-center gap-2"
                            >
                                <span>End</span>
                            </button>
                        </div>
                    ) : null}
                </div>

            </div>

            {/* Bottom Visualizer - The "Vapi Effect" */}
            <div className="absolute bottom-0 left-0 right-0 h-48 md:h-64 flex items-end justify-center gap-1.5 md:gap-3 px-4 pb-0 opacity-80 pointer-events-none mask-gradient-top">
                {bars.map((color, i) => (
                    <EqualizerBar
                        key={i}
                        color={color}
                        delay={i * 0.05}
                        isAnimating={callStatus === 'active'}
                        volume={volume}
                    />
                ))}
            </div>

            {/* Gradient Fade for Visualizer */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#020202] to-transparent z-20 pointer-events-none" />

        </div>
    );
}
