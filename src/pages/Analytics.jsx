import { motion } from 'framer-motion';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
    AreaChart,
    Area
} from 'recharts';
import {
    TrendingUp,
    TrendingDown,
    Phone,
    Clock,
    Users,
    Smile,
    Activity,
    Zap,
    Target
} from 'lucide-react';
import { analyticsData } from '../utils/mockData';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-gray-800/95 backdrop-blur-xl border border-gray-700/50 rounded-xl p-4 shadow-2xl">
                <p className="text-sm font-semibold text-white mb-2">{label}</p>
                {payload.map((entry, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                        <span className="w-3 h-3 rounded-full" style={{ background: entry.color }} />
                        <span className="text-gray-400">{entry.name}:</span>
                        <span className="font-semibold text-white">{entry.value}</span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

const StatCard = ({ label, value, change, up, icon: Icon, gradient, delay }) => (
    <motion.div
        className="card p-6 hover-lift"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.4 }}
    >
        <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}>
                <Icon className="w-6 h-6 text-white" />
            </div>
            <div className={`flex items-center gap-1.5 text-sm font-semibold ${up ? 'text-emerald-400' : 'text-rose-400'}`}>
                {up ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                {change}
            </div>
        </div>
        <p className="text-3xl font-extrabold text-white tracking-tight">{value}</p>
        <p className="text-sm text-gray-400 mt-1 font-medium">{label}</p>
    </motion.div>
);

export default function Analytics() {
    const stats = [
        { label: 'Total Calls (Week)', value: '1,247', change: '+12%', up: true, icon: Phone, gradient: 'from-indigo-500 to-purple-600' },
        { label: 'Avg Resolution Time', value: '3:42', change: '-8%', up: true, icon: Clock, gradient: 'from-emerald-500 to-teal-600' },
        { label: 'Unique Callers', value: '892', change: '+5%', up: true, icon: Users, gradient: 'from-orange-500 to-amber-600' },
        { label: 'Satisfaction Score', value: '4.2/5', change: '+0.3', up: true, icon: Smile, gradient: 'from-pink-500 to-rose-600' },
    ];

    const COLORS = ['#FF9933', '#6366F1', '#10B981', '#64748B'];

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
                    <p className="text-gray-400 mt-1">Performance metrics and insights</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/30">
                    <Activity className="w-4 h-4 text-indigo-400" />
                    <span className="text-sm text-indigo-300 font-medium">Last 7 days</span>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {stats.map((stat, i) => (
                    <StatCard key={stat.label} {...stat} delay={i * 0.1} />
                ))}
            </div>

            {/* Charts Grid */}
            <div className="grid lg:grid-cols-2 gap-6">
                {/* Call Volume Chart */}
                <motion.div
                    className="card overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                >
                    <div className="px-6 py-5 border-b border-gray-800/50 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-indigo-400" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white">Call Volume</h3>
                            <p className="text-xs text-gray-500">This week's performance</p>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={analyticsData.callVolume}>
                                    <defs>
                                        <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#6366F1" stopOpacity={0.4} />
                                            <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                                            <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                    <XAxis dataKey="day" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend
                                        verticalAlign="top"
                                        height={36}
                                        iconType="circle"
                                        formatter={(value) => <span className="text-gray-300 text-sm">{value}</span>}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="calls"
                                        name="Total Calls"
                                        stroke="#6366F1"
                                        strokeWidth={2}
                                        fillOpacity={1}
                                        fill="url(#colorCalls)"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="resolved"
                                        name="Resolved"
                                        stroke="#10B981"
                                        strokeWidth={2}
                                        fillOpacity={1}
                                        fill="url(#colorResolved)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </motion.div>

                {/* Department Breakdown */}
                <motion.div
                    className="card overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                >
                    <div className="px-6 py-5 border-b border-gray-800/50 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
                            <Target className="w-5 h-5 text-orange-400" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white">Department Breakdown</h3>
                            <p className="text-xs text-gray-500">Call distribution by department</p>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="h-72 flex items-center">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={analyticsData.departmentBreakdown}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={70}
                                        outerRadius={100}
                                        paddingAngle={4}
                                        dataKey="value"
                                    >
                                        {analyticsData.departmentBreakdown.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                                        ))}
                                    </Pie>
                                    <Tooltip content={<CustomTooltip />} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex flex-wrap justify-center gap-4 mt-4">
                            {analyticsData.departmentBreakdown.map((item) => (
                                <div key={item.name} className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full" style={{ background: item.color }} />
                                    <span className="text-sm text-gray-400">{item.name}</span>
                                    <span className="text-sm font-semibold text-white">{item.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Peak Hours */}
                <motion.div
                    className="card overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                >
                    <div className="px-6 py-5 border-b border-gray-800/50 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                            <Zap className="w-5 h-5 text-amber-400" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white">Peak Hours</h3>
                            <p className="text-xs text-gray-500">Call distribution by hour</p>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={analyticsData.peakHours}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                    <XAxis dataKey="hour" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Bar
                                        dataKey="calls"
                                        name="Calls"
                                        fill="#FF9933"
                                        radius={[6, 6, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </motion.div>

                {/* Sentiment Trend */}
                <motion.div
                    className="card overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.4 }}
                >
                    <div className="px-6 py-5 border-b border-gray-800/50 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                            <Smile className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white">Sentiment Trend</h3>
                            <p className="text-xs text-gray-500">Caller satisfaction over time</p>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={analyticsData.sentimentTrend}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                    <XAxis dataKey="day" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend
                                        verticalAlign="top"
                                        height={36}
                                        iconType="circle"
                                        formatter={(value) => <span className="text-gray-300 text-sm">{value}</span>}
                                    />
                                    <Bar dataKey="positive" name="Positive" stackId="a" fill="#10B981" radius={[0, 0, 0, 0]} />
                                    <Bar dataKey="neutral" name="Neutral" stackId="a" fill="#F59E0B" radius={[0, 0, 0, 0]} />
                                    <Bar dataKey="negative" name="Negative" stackId="a" fill="#EF4444" radius={[6, 6, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
