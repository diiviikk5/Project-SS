import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
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
    Frown,
    Zap,
    Activity,
    PhoneIncoming,
    PhoneOutgoing,
    MessageSquare
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

export default function Dashboard() {
    const { stats, activeCalls, updateCallDurations } = useAppStore();

    useEffect(() => {
        const interval = setInterval(updateCallDurations, 1000);
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
            value: stats.totalCalls.toLocaleString(),
            change: '+12%',
            trend: 'up',
            icon: Phone,
            gradient: 'from-indigo-500 to-purple-600',
            iconBg: 'bg-indigo-500/20'
        },
        {
            label: 'Active Calls',
            value: stats.activeCalls,
            change: 'Live',
            trend: 'live',
            icon: Activity,
            gradient: 'from-emerald-500 to-teal-600',
            iconBg: 'bg-emerald-500/20'
        },
        {
            label: 'Avg Duration',
            value: stats.avgDuration,
            change: '-8%',
            trend: 'down',
            icon: Clock,
            gradient: 'from-orange-500 to-amber-600',
            iconBg: 'bg-orange-500/20'
        },
        {
            label: 'Resolution Rate',
            value: `${stats.resolutionRate}%`,
            change: '+3%',
            trend: 'up',
            icon: TrendingUp,
            gradient: 'from-cyan-500 to-blue-600',
            iconBg: 'bg-cyan-500/20'
        },
    ];

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-gray-400 mt-1">Real-time overview of call center operations</p>
                </div>
                <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                    <span className="live-dot" />
                    <span className="text-sm text-emerald-400 font-semibold">System Online</span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {statCards.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        className="card p-6 hover-lift"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.4 }}
                    >
                        <div className="flex items-start justify-between mb-5">
                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}>
                                <stat.icon className="w-7 h-7 text-white" />
                            </div>
                            <span className={`badge ${stat.trend === 'live' ? 'badge-success' :
                                    stat.trend === 'up' ? 'badge-success' :
                                        'badge-primary'
                                }`}>
                                {stat.trend === 'live' && <span className="live-dot mr-1.5" style={{ width: 6, height: 6 }} />}
                                {stat.change}
                            </span>
                        </div>
                        <p className="text-4xl font-extrabold text-white mb-2 tracking-tight">{stat.value}</p>
                        <p className="text-sm text-gray-400 font-medium">{stat.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Active Calls - Takes 2 columns */}
                <motion.div
                    className="lg:col-span-2 card overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                >
                    {/* Header */}
                    <div className="px-6 py-5 border-b border-gray-800/50 flex items-center justify-between bg-gray-900/30">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                                <PhoneIncoming className="w-5 h-5 text-emerald-400" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-white">Active Calls</h2>
                                <p className="text-xs text-gray-500">Real-time monitoring</p>
                            </div>
                        </div>
                        <Link
                            to="/dashboard/calls"
                            className="flex items-center gap-1.5 text-sm text-primary-light hover:text-white transition-colors font-medium"
                        >
                            View All
                            <ArrowUpRight className="w-4 h-4" />
                        </Link>
                    </div>

                    {/* Calls List */}
                    <div className="p-4 space-y-3 max-h-[420px] overflow-y-auto">
                        {activeCalls.map((call, i) => {
                            const sentiment = sentimentConfig[call.sentiment] || sentimentConfig.neutral;
                            const SentimentIcon = sentiment.icon;
                            const dept = departmentColors[call.department] || departmentColors['Grievance Cell'];

                            return (
                                <motion.div
                                    key={call.id}
                                    className="flex items-center gap-4 p-4 rounded-xl bg-gray-800/40 border border-gray-700/50 hover:bg-gray-800/60 hover:border-gray-600/50 transition-all cursor-pointer group"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 + i * 0.1 }}
                                >
                                    {/* Sentiment Icon */}
                                    <div className={`w-12 h-12 rounded-xl ${sentiment.bg} border ${sentiment.border} flex items-center justify-center shrink-0`}>
                                        <SentimentIcon className={`w-6 h-6 ${sentiment.color}`} />
                                    </div>

                                    {/* Call Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2.5 flex-wrap">
                                            <span className="font-semibold text-white">{call.callerName}</span>
                                            <span className="text-xs text-gray-500 font-mono">{call.callerId}</span>
                                        </div>
                                        <div className="flex items-center gap-2.5 mt-2 flex-wrap">
                                            <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${dept.bg} ${dept.text} border ${dept.border}`}>
                                                {call.department}
                                            </span>
                                            <span className="text-xs text-gray-500">{call.topic}</span>
                                        </div>
                                    </div>

                                    {/* Duration & Language */}
                                    <div className="text-right shrink-0">
                                        <p className="font-mono text-xl font-bold text-white">{formatDuration(call.duration)}</p>
                                        <p className="text-xs text-gray-500 mt-1">{call.language}</p>
                                    </div>
                                </motion.div>
                            );
                        })}

                        {activeCalls.length === 0 && (
                            <div className="text-center py-16">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-800/50 flex items-center justify-center">
                                    <Phone className="w-8 h-8 text-gray-600" />
                                </div>
                                <p className="text-gray-500 font-medium">No active calls at the moment</p>
                                <p className="text-sm text-gray-600 mt-1">All lines are available</p>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Right Sidebar */}
                <div className="space-y-6">
                    {/* Quick Actions */}
                    <motion.div
                        className="card p-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.4 }}
                    >
                        <h2 className="text-lg font-bold mb-5 text-white">Quick Actions</h2>
                        <div className="space-y-3">
                            <Link to="/demo" className="btn btn-saffron w-full justify-start">
                                <Bot className="w-5 h-5" />
                                Start Voice Demo
                            </Link>
                            <button className="btn btn-secondary w-full justify-start">
                                <PhoneOutgoing className="w-5 h-5" />
                                Outbound Campaign
                            </button>
                            <button className="btn btn-secondary w-full justify-start">
                                <Users className="w-5 h-5" />
                                Manage Agents
                            </button>
                        </div>
                    </motion.div>

                    {/* System Status */}
                    <motion.div
                        className="card p-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.4 }}
                    >
                        <h2 className="text-lg font-bold mb-5 text-white">System Status</h2>
                        <div className="space-y-4">
                            {[
                                { name: 'Voice Engine', status: 'Operational', ok: true },
                                { name: 'AI Processing', status: 'Operational', ok: true },
                                { name: 'Database', status: 'Operational', ok: true },
                                { name: 'SMS Gateway', status: 'Operational', ok: true },
                            ].map((system, i) => (
                                <motion.div
                                    key={system.name}
                                    className="flex items-center justify-between p-3 rounded-lg bg-gray-800/30 border border-gray-700/50"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.7 + i * 0.05 }}
                                >
                                    <span className="text-sm text-gray-300 font-medium">{system.name}</span>
                                    <div className="flex items-center gap-2">
                                        {system.ok ? (
                                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                        ) : (
                                            <AlertCircle className="w-4 h-4 text-amber-400" />
                                        )}
                                        <span className={`text-xs font-semibold ${system.ok ? 'text-emerald-400' : 'text-amber-400'}`}>
                                            {system.status}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Performance Highlight */}
                    <motion.div
                        className="card p-6 bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border-indigo-500/20"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.4 }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <Zap className="w-6 h-6 text-amber-400" />
                            <h3 className="font-bold text-white">Performance</h3>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-400">Avg Response Time</span>
                                <span className="text-lg font-bold text-white">&lt;1s</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-400">Uptime</span>
                                <span className="text-lg font-bold text-emerald-400">99.9%</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-400">Satisfaction</span>
                                <span className="text-lg font-bold text-white">4.2/5 ⭐</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
