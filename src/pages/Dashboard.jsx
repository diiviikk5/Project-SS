import { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Phone,
    Clock,
    TrendingUp,
    Users,
    CheckCircle2,
    AlertCircle,
    ArrowUpRight,
    Bot,
    Smile,
    Meh,
    Frown
} from 'lucide-react';
import { useAppStore } from '../stores/appStore';

const sentimentIcons = {
    positive: { icon: Smile, color: 'text-success', bg: 'bg-success/20' },
    neutral: { icon: Meh, color: 'text-warning', bg: 'bg-warning/20' },
    frustrated: { icon: Frown, color: 'text-error', bg: 'bg-error/20' },
};

export default function Dashboard() {
    const { stats, activeCalls, updateCallDurations } = useAppStore();

    // Update call durations every second
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

    const statCards = [
        {
            label: 'Total Calls Today',
            value: stats.totalCalls,
            change: '+12%',
            icon: Phone,
            color: 'from-primary to-purple-500'
        },
        {
            label: 'Active Calls',
            value: stats.activeCalls,
            change: 'Live',
            icon: Users,
            color: 'from-success to-emerald-500',
            pulse: true
        },
        {
            label: 'Avg Duration',
            value: stats.avgDuration,
            change: '-8%',
            icon: Clock,
            color: 'from-saffron to-orange-500'
        },
        {
            label: 'Resolution Rate',
            value: `${stats.resolutionRate}%`,
            change: '+3%',
            icon: TrendingUp,
            color: 'from-green-500 to-teal-500'
        },
    ];

    return (
        <div className="space-y-6">
            {/* Page Title */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    <p className="text-gray-500">Real-time overview of call center operations</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="live-dot" />
                    <span className="text-sm text-success font-medium">System Online</span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        className="card p-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                                <stat.icon className="w-6 h-6 text-white" />
                            </div>
                            <span className={`badge ${stat.change === 'Live'
                                    ? 'badge-success'
                                    : stat.change.startsWith('+')
                                        ? 'badge-success'
                                        : 'badge-primary'
                                }`}>
                                {stat.pulse && <span className="live-dot mr-1" style={{ width: 6, height: 6 }} />}
                                {stat.change}
                            </span>
                        </div>
                        <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                        <p className="text-sm text-gray-500">{stat.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Active Calls & Quick Actions */}
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Active Calls */}
                <div className="lg:col-span-2 card p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold flex items-center gap-2">
                            <span className="live-dot" />
                            Active Calls
                        </h2>
                        <a href="/dashboard/calls" className="text-sm text-primary hover:underline flex items-center gap-1">
                            View All <ArrowUpRight className="w-4 h-4" />
                        </a>
                    </div>

                    <div className="space-y-4">
                        {activeCalls.map((call, i) => {
                            const sentiment = sentimentIcons[call.sentiment] || sentimentIcons.neutral;
                            const SentimentIcon = sentiment.icon;

                            return (
                                <motion.div
                                    key={call.id}
                                    className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition-colors"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <div className={`w-10 h-10 rounded-full ${sentiment.bg} flex items-center justify-center`}>
                                        <SentimentIcon className={`w-5 h-5 ${sentiment.color}`} />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium text-white">{call.callerName}</span>
                                            <span className="text-xs text-gray-500">{call.callerId}</span>
                                        </div>
                                        <div className="flex items-center gap-3 mt-1">
                                            <span className={`badge ${call.department === 'Election Commission' ? 'badge-saffron' :
                                                    call.department === 'MCD Services' ? 'badge-primary' :
                                                        'badge-success'
                                                }`}>
                                                {call.department}
                                            </span>
                                            <span className="text-xs text-gray-500">{call.topic}</span>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <p className="font-mono text-white">{formatDuration(call.duration)}</p>
                                        <p className="text-xs text-gray-500">{call.language}</p>
                                    </div>
                                </motion.div>
                            );
                        })}

                        {activeCalls.length === 0 && (
                            <div className="text-center py-12 text-gray-500">
                                <Phone className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                <p>No active calls at the moment</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Actions & System Status */}
                <div className="space-y-6">
                    {/* Quick Actions */}
                    <div className="card p-6">
                        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
                        <div className="space-y-3">
                            <a href="/demo" className="btn btn-saffron w-full justify-start">
                                <Bot className="w-4 h-4" />
                                Start Voice Demo
                            </a>
                            <button className="btn btn-secondary w-full justify-start">
                                <Phone className="w-4 h-4" />
                                Outbound Campaign
                            </button>
                            <button className="btn btn-secondary w-full justify-start">
                                <Users className="w-4 h-4" />
                                Manage Agents
                            </button>
                        </div>
                    </div>

                    {/* System Status */}
                    <div className="card p-6">
                        <h2 className="text-lg font-semibold mb-4">System Status</h2>
                        <div className="space-y-3">
                            {[
                                { name: 'Voice Engine', status: 'Operational', ok: true },
                                { name: 'AI Processing', status: 'Operational', ok: true },
                                { name: 'Database', status: 'Operational', ok: true },
                                { name: 'SMS Gateway', status: 'Operational', ok: true },
                            ].map((system) => (
                                <div key={system.name} className="flex items-center justify-between">
                                    <span className="text-sm text-gray-400">{system.name}</span>
                                    <div className="flex items-center gap-2">
                                        {system.ok ? (
                                            <>
                                                <CheckCircle2 className="w-4 h-4 text-success" />
                                                <span className="text-xs text-success">{system.status}</span>
                                            </>
                                        ) : (
                                            <>
                                                <AlertCircle className="w-4 h-4 text-warning" />
                                                <span className="text-xs text-warning">{system.status}</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
