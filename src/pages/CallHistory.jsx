import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Search,
    Download,
    CheckCircle2,
    Clock,
    AlertTriangle,
    Phone,
    Smile,
    Meh,
    Frown,
    Filter,
    ChevronDown
} from 'lucide-react';
import { callHistory } from '../utils/mockData';

const resolutionConfig = {
    resolved: { icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/20', border: 'border-emerald-500/30', label: 'Resolved' },
    pending: { icon: Clock, color: 'text-amber-400', bg: 'bg-amber-500/20', border: 'border-amber-500/30', label: 'Pending' },
    escalated: { icon: AlertTriangle, color: 'text-rose-400', bg: 'bg-rose-500/20', border: 'border-rose-500/30', label: 'Escalated' },
};

const sentimentConfig = {
    positive: { icon: Smile, color: 'text-emerald-400', bg: 'bg-emerald-500/20' },
    neutral: { icon: Meh, color: 'text-amber-400', bg: 'bg-amber-500/20' },
    frustrated: { icon: Frown, color: 'text-rose-400', bg: 'bg-rose-500/20' },
};

const departmentColors = {
    'Election': { bg: 'bg-orange-500/20', text: 'text-orange-300', border: 'border-orange-500/30' },
    'MCD': { bg: 'bg-indigo-500/20', text: 'text-indigo-300', border: 'border-indigo-500/30' },
    'Grievance': { bg: 'bg-emerald-500/20', text: 'text-emerald-300', border: 'border-emerald-500/30' },
};

export default function CallHistory() {
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredCalls = mockCallHistory.filter(call => {
        if (filter !== 'all' && call.resolution !== filter) return false;
        if (searchQuery && !call.callerName.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
    });

    const formatDuration = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const filterButtons = [
        { key: 'all', label: 'All Calls' },
        { key: 'resolved', label: 'Resolved' },
        { key: 'pending', label: 'Pending' },
        { key: 'escalated', label: 'Escalated' },
    ];

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Call History</h1>
                    <p className="text-gray-400 mt-1">View and search past call records</p>
                </div>
                <button className="btn btn-secondary">
                    <Download className="w-4 h-4" />
                    Export CSV
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search by caller name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="input pl-12 w-full"
                    />
                </div>

                {/* Filter Buttons */}
                <div className="flex gap-2 flex-wrap">
                    {filterButtons.map((btn) => (
                        <button
                            key={btn.key}
                            onClick={() => setFilter(btn.key)}
                            className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${filter === btn.key
                                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-white border border-gray-700/50'
                                }`}
                        >
                            {btn.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <motion.div
                className="card overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-800/50 bg-gray-900/30">
                                <th className="text-left p-5 text-sm font-semibold text-gray-300">Caller</th>
                                <th className="text-left p-5 text-sm font-semibold text-gray-300">Department</th>
                                <th className="text-left p-5 text-sm font-semibold text-gray-300">Duration</th>
                                <th className="text-left p-5 text-sm font-semibold text-gray-300">Sentiment</th>
                                <th className="text-left p-5 text-sm font-semibold text-gray-300">Status</th>
                                <th className="text-left p-5 text-sm font-semibold text-gray-300">Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCalls.map((call, i) => {
                                const resolution = resolutionConfig[call.resolution];
                                const sentiment = sentimentConfig[call.sentiment];
                                const dept = departmentColors[call.department] || departmentColors['Grievance'];
                                const ResolutionIcon = resolution.icon;
                                const SentimentIcon = sentiment.icon;

                                return (
                                    <motion.tr
                                        key={call.id}
                                        className="border-b border-gray-800/30 hover:bg-gray-800/30 transition-colors group cursor-pointer"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.03, duration: 0.3 }}
                                    >
                                        <td className="p-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-gray-700/50 flex items-center justify-center group-hover:bg-gray-700 transition-colors">
                                                    <Phone className="w-5 h-5 text-gray-400" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-white">{call.callerName}</p>
                                                    <p className="text-xs text-gray-500 font-mono">{call.callerId}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-5">
                                            <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${dept.bg} ${dept.text} border ${dept.border}`}>
                                                {call.department}
                                            </span>
                                        </td>
                                        <td className="p-5">
                                            <span className="font-mono text-lg text-white">{formatDuration(call.duration)}</span>
                                        </td>
                                        <td className="p-5">
                                            <div className={`w-10 h-10 rounded-xl ${sentiment.bg} flex items-center justify-center`}>
                                                <SentimentIcon className={`w-5 h-5 ${sentiment.color}`} />
                                            </div>
                                        </td>
                                        <td className="p-5">
                                            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold ${resolution.bg} ${resolution.color} border ${resolution.border}`}>
                                                <ResolutionIcon className="w-4 h-4" />
                                                {resolution.label}
                                            </div>
                                        </td>
                                        <td className="p-5">
                                            <span className="text-gray-400 font-medium">{call.time}</span>
                                        </td>
                                    </motion.tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {filteredCalls.length === 0 && (
                    <div className="p-16 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-800/50 flex items-center justify-center">
                            <Search className="w-8 h-8 text-gray-600" />
                        </div>
                        <p className="text-gray-400 font-medium">No calls match your search</p>
                        <p className="text-sm text-gray-600 mt-1">Try adjusting your filters</p>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
