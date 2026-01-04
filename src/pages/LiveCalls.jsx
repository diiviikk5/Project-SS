import { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Phone,
    Bot,
    Smile,
    Meh,
    Frown,
    MessageSquare,
    Activity,
    User
} from 'lucide-react';
import { useAppStore } from '../stores/appStore';

const sentimentConfig = {
    positive: {
        icon: Smile,
        color: 'text-emerald-400',
        bg: 'bg-emerald-500/20',
        border: 'border-emerald-500/30',
        label: 'Positive'
    },
    neutral: {
        icon: Meh,
        color: 'text-amber-400',
        bg: 'bg-amber-500/20',
        border: 'border-amber-500/30',
        label: 'Neutral'
    },
    frustrated: {
        icon: Frown,
        color: 'text-rose-400',
        bg: 'bg-rose-500/20',
        border: 'border-rose-500/30',
        label: 'Frustrated'
    },
};

const departmentColors = {
    'Election Commission': { bg: 'bg-orange-500/20', text: 'text-orange-300', border: 'border-orange-500/30' },
    'MCD Services': { bg: 'bg-indigo-500/20', text: 'text-indigo-300', border: 'border-indigo-500/30' },
    'Grievance Cell': { bg: 'bg-emerald-500/20', text: 'text-emerald-300', border: 'border-emerald-500/30' },
};

export default function LiveCalls() {
    const { activeCalls, updateCallDurations } = useAppStore();

    useEffect(() => {
        const interval = setInterval(updateCallDurations, 1000);
        return () => clearInterval(interval);
    }, [updateCallDurations]);

    const formatDuration = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <span className="live-dot" />
                        <h1 className="text-3xl font-bold tracking-tight">Live Calls</h1>
                    </div>
                    <p className="text-gray-400">Real-time call monitoring and transcripts</p>
                </div>
                <div className="flex items-center gap-3 px-5 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                    <Activity className="w-5 h-5 text-emerald-400" />
                    <span className="text-lg font-bold text-emerald-400">{activeCalls.length}</span>
                    <span className="text-sm text-emerald-400/80">Active</span>
                </div>
            </div>

            {/* Calls Grid */}
            <div className="grid lg:grid-cols-2 gap-6">
                {activeCalls.map((call, i) => {
                    const sentiment = sentimentConfig[call.sentiment] || sentimentConfig.neutral;
                    const SentimentIcon = sentiment.icon;
                    const dept = departmentColors[call.department] || departmentColors['Grievance Cell'];

                    return (
                        <motion.div
                            key={call.id}
                            className="card overflow-hidden hover-lift"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.4 }}
                        >
                            {/* Call Header */}
                            <div className="p-5 bg-gradient-to-r from-gray-800/60 to-gray-900/60 border-b border-gray-700/50 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl ${sentiment.bg} border ${sentiment.border} flex items-center justify-center`}>
                                        <SentimentIcon className={`w-6 h-6 ${sentiment.color}`} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-white text-lg">{call.callerName}</p>
                                        <p className="text-xs text-gray-500 font-mono">{call.callerId}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-mono text-2xl font-bold text-white">{formatDuration(call.duration)}</p>
                                    <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${dept.bg} ${dept.text} border ${dept.border}`}>
                                        {call.department}
                                    </span>
                                </div>
                            </div>

                            {/* Live Transcript */}
                            <div className="p-5">
                                <div className="flex items-center gap-2.5 mb-4">
                                    <MessageSquare className="w-5 h-5 text-gray-500" />
                                    <span className="text-sm font-medium text-gray-400">Live Transcript</span>
                                </div>

                                <div className="space-y-3 max-h-56 overflow-y-auto pr-2">
                                    {call.transcript.map((msg, j) => (
                                        <motion.div
                                            key={j}
                                            className={`flex items-start gap-3 ${msg.speaker === 'user' ? 'flex-row-reverse' : ''}`}
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: j * 0.05 }}
                                        >
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${msg.speaker === 'agent'
                                                    ? 'bg-gradient-to-br from-saffron/30 to-orange-500/30 border border-saffron/30'
                                                    : 'bg-primary/20 border border-primary/30'
                                                }`}>
                                                {msg.speaker === 'agent'
                                                    ? <Bot className="w-4 h-4 text-saffron" />
                                                    : <User className="w-4 h-4 text-primary-light" />
                                                }
                                            </div>
                                            <div className={`max-w-[80%] rounded-xl px-4 py-2.5 ${msg.speaker === 'agent'
                                                    ? 'bg-gray-800/60 border border-gray-700/50 rounded-tl-none'
                                                    : 'bg-primary/15 border border-primary/25 rounded-tr-none'
                                                }`}>
                                                <p className="text-sm text-gray-200 leading-relaxed">{msg.text}</p>
                                                <p className="text-xs text-gray-500 mt-1.5">{msg.time}</p>
                                            </div>
                                        </motion.div>
                                    ))}

                                    {/* Typing indicator */}
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-saffron/30 to-orange-500/30 border border-saffron/30 flex items-center justify-center">
                                            <Bot className="w-4 h-4 text-saffron" />
                                        </div>
                                        <div className="bg-gray-800/60 border border-gray-700/50 rounded-xl rounded-tl-none px-4 py-3">
                                            <div className="flex gap-1.5">
                                                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                                                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                                                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {activeCalls.length === 0 && (
                <motion.div
                    className="card p-16 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gray-800/50 border border-gray-700/50 flex items-center justify-center">
                        <Phone className="w-10 h-10 text-gray-600" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">No Active Calls</h3>
                    <p className="text-gray-500">All lines are currently available</p>
                </motion.div>
            )}
        </div>
    );
}
