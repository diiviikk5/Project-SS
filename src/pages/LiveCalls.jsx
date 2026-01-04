import { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Phone,
    Bot,
    Smile,
    Meh,
    Frown,
    MessageSquare
} from 'lucide-react';
import { useAppStore } from '../stores/appStore';

const sentimentIcons = {
    positive: { icon: Smile, color: 'text-success', bg: 'bg-success/20' },
    neutral: { icon: Meh, color: 'text-warning', bg: 'bg-warning/20' },
    frustrated: { icon: Frown, color: 'text-error', bg: 'bg-error/20' },
};

export default function LiveCalls() {
    const { activeCalls, updateCallDurations } = useAppStore();

    useEffect(() => {
        const interval = setInterval(() => {
            updateCallDurations();
        }, 1000);
        return () => clearInterval(interval);
    }, [updateCallDurations]);

    const formatDuration = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="space-y-6">
            {/* Page Title */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-3">
                        <span className="live-dot" />
                        Live Calls
                    </h1>
                    <p className="text-gray-500">Real-time call monitoring and transcripts</p>
                </div>
                <span className="badge badge-success">
                    {activeCalls.length} Active
                </span>
            </div>

            {/* Calls Grid */}
            <div className="grid lg:grid-cols-2 gap-6">
                {activeCalls.map((call, i) => {
                    const sentiment = sentimentIcons[call.sentiment] || sentimentIcons.neutral;
                    const SentimentIcon = sentiment.icon;

                    return (
                        <motion.div
                            key={call.id}
                            className="card overflow-hidden"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            {/* Call Header */}
                            <div className="p-4 bg-gray-800/50 border-b border-gray-700 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full ${sentiment.bg} flex items-center justify-center`}>
                                        <SentimentIcon className={`w-5 h-5 ${sentiment.color}`} />
                                    </div>
                                    <div>
                                        <p className="font-medium text-white">{call.callerName}</p>
                                        <p className="text-xs text-gray-500">{call.callerId}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-mono text-lg text-white">{formatDuration(call.duration)}</p>
                                    <span className={`badge ${call.department === 'Election Commission' ? 'badge-saffron' :
                                            call.department === 'MCD Services' ? 'badge-primary' :
                                                'badge-success'
                                        }`}>
                                        {call.department}
                                    </span>
                                </div>
                            </div>

                            {/* Live Transcript */}
                            <div className="p-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <MessageSquare className="w-4 h-4 text-gray-500" />
                                    <span className="text-sm text-gray-500">Live Transcript</span>
                                </div>

                                <div className="space-y-3 max-h-48 overflow-y-auto">
                                    {call.transcript.map((msg, j) => (
                                        <div
                                            key={j}
                                            className={`flex items-start gap-2 ${msg.speaker === 'user' ? 'flex-row-reverse' : ''}`}
                                        >
                                            <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${msg.speaker === 'agent' ? 'bg-saffron/20' : 'bg-primary/20'
                                                }`}>
                                                {msg.speaker === 'agent'
                                                    ? <Bot className="w-3 h-3 text-saffron" />
                                                    : <Phone className="w-3 h-3 text-primary" />
                                                }
                                            </div>
                                            <div className={`max-w-[80%] rounded-xl px-3 py-2 ${msg.speaker === 'agent'
                                                    ? 'bg-gray-700 rounded-tl-none'
                                                    : 'bg-primary/20 rounded-tr-none'
                                                }`}>
                                                <p className="text-sm text-gray-200">{msg.text}</p>
                                                <p className="text-xs text-gray-500 mt-1">{msg.time}</p>
                                            </div>
                                        </div>
                                    ))}

                                    {/* Typing indicator */}
                                    <div className="flex items-start gap-2">
                                        <div className="w-6 h-6 rounded-full bg-saffron/20 flex items-center justify-center">
                                            <Bot className="w-3 h-3 text-saffron" />
                                        </div>
                                        <div className="bg-gray-700 rounded-xl rounded-tl-none px-3 py-2">
                                            <div className="flex gap-1">
                                                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                                                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                                                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
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
                <div className="card p-12 text-center">
                    <Phone className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                    <h3 className="text-xl font-semibold mb-2">No Active Calls</h3>
                    <p className="text-gray-500">All lines are currently available</p>
                </div>
            )}
        </div>
    );
}
