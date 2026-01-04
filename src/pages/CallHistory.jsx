import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Search,
    Filter,
    Download,
    CheckCircle2,
    Clock,
    AlertTriangle,
    Phone,
    Smile,
    Meh,
    Frown
} from 'lucide-react';
import { mockCallHistory } from '../utils/mockData';

const resolutionStyles = {
    resolved: { icon: CheckCircle2, color: 'text-success', bg: 'bg-success/20', label: 'Resolved' },
    pending: { icon: Clock, color: 'text-warning', bg: 'bg-warning/20', label: 'Pending' },
    escalated: { icon: AlertTriangle, color: 'text-error', bg: 'bg-error/20', label: 'Escalated' },
};

const sentimentStyles = {
    positive: { icon: Smile, color: 'text-success' },
    neutral: { icon: Meh, color: 'text-warning' },
    frustrated: { icon: Frown, color: 'text-error' },
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

    return (
        <div className="space-y-6">
            {/* Page Title */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Call History</h1>
                    <p className="text-gray-500">View and search past call records</p>
                </div>
                <button className="btn btn-secondary">
                    <Download className="w-4 h-4" />
                    Export CSV
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search by caller name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="input pl-10 w-full"
                    />
                </div>

                <div className="flex gap-2">
                    {['all', 'resolved', 'pending', 'escalated'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`btn ${filter === f ? 'btn-primary' : 'btn-secondary'} capitalize`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-800">
                                <th className="text-left p-4 text-sm font-medium text-gray-400">Caller</th>
                                <th className="text-left p-4 text-sm font-medium text-gray-400">Department</th>
                                <th className="text-left p-4 text-sm font-medium text-gray-400">Duration</th>
                                <th className="text-left p-4 text-sm font-medium text-gray-400">Sentiment</th>
                                <th className="text-left p-4 text-sm font-medium text-gray-400">Status</th>
                                <th className="text-left p-4 text-sm font-medium text-gray-400">Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCalls.map((call, i) => {
                                const resolution = resolutionStyles[call.resolution];
                                const sentiment = sentimentStyles[call.sentiment];
                                const ResolutionIcon = resolution.icon;
                                const SentimentIcon = sentiment.icon;

                                return (
                                    <motion.tr
                                        key={call.id}
                                        className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: i * 0.05 }}
                                    >
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                                                    <Phone className="w-4 h-4 text-gray-400" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-white">{call.callerName}</p>
                                                    <p className="text-xs text-gray-500">{call.callerId}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className={`badge ${call.department === 'Election' ? 'badge-saffron' :
                                                    call.department === 'MCD' ? 'badge-primary' :
                                                        'badge-success'
                                                }`}>
                                                {call.department}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <span className="font-mono text-gray-300">{formatDuration(call.duration)}</span>
                                        </td>
                                        <td className="p-4">
                                            <SentimentIcon className={`w-5 h-5 ${sentiment.color}`} />
                                        </td>
                                        <td className="p-4">
                                            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${resolution.bg} ${resolution.color}`}>
                                                <ResolutionIcon className="w-3.5 h-3.5" />
                                                {resolution.label}
                                            </div>
                                        </td>
                                        <td className="p-4 text-gray-400">{call.time}</td>
                                    </motion.tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {filteredCalls.length === 0 && (
                    <div className="p-12 text-center">
                        <Search className="w-12 h-12 mx-auto mb-3 text-gray-600" />
                        <p className="text-gray-500">No calls match your search criteria</p>
                    </div>
                )}
            </div>
        </div>
    );
}
