import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Phone,
    BarChart3,
    History,
    Settings,
    ChevronLeft,
    ChevronRight,
    Bell,
    Search,
    Menu,
    Bot,
    X,
    Mic,
    Activity
} from 'lucide-react';
import { useAppStore } from '../stores/appStore';

const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Overview', exact: true },
    { path: '/dashboard/calls', icon: Phone, label: 'Live Calls' },
    { path: '/dashboard/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/dashboard/history', icon: History, label: 'Call History' },
    { path: '/dashboard/settings', icon: Settings, label: 'Settings' },
];

export default function DashboardLayout() {
    const location = useLocation();
    const { sidebarOpen, toggleSidebar, stats } = useAppStore();
    const [isMobile, setIsMobile] = useState(false);
    const [searchFocused, setSearchFocused] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Close sidebar on mobile when route changes
    useEffect(() => {
        if (isMobile && sidebarOpen) {
            toggleSidebar();
        }
    }, [location.pathname]);

    return (
        <div className="min-h-screen bg-gray-950 flex">
            {/* Sidebar */}
            <motion.aside
                className={`fixed lg:static inset-y-0 left-0 z-40 flex flex-col ${isMobile && !sidebarOpen ? '-translate-x-full' : 'translate-x-0'
                    } transition-transform lg:transition-none`}
                animate={{ width: sidebarOpen ? 280 : 88 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
            >
                {/* Sidebar Background */}
                <div className="absolute inset-0 bg-gray-900/95 backdrop-blur-xl border-r border-gray-800/50" />

                <div className="relative flex flex-col h-full">
                    {/* Logo */}
                    <div className="h-20 flex items-center px-5 border-b border-gray-800/50">
                        <Link to="/" className="flex items-center gap-3 overflow-hidden group">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-saffron via-orange-500 to-primary flex items-center justify-center shadow-lg shrink-0 group-hover:shadow-saffron-glow transition-shadow">
                                <Bot className="w-6 h-6 text-white" />
                            </div>
                            <AnimatePresence>
                                {sidebarOpen && (
                                    <motion.span
                                        className="text-xl font-bold whitespace-nowrap"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <span className="text-saffron">Sarkari</span>
                                        <span className="text-white">Saathi</span>
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto">
                        {navItems.map((item) => {
                            const isActive = item.exact
                                ? location.pathname === item.path
                                : location.pathname.startsWith(item.path) && item.path !== '/dashboard';

                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all group relative ${isActive
                                            ? 'bg-primary/15 text-white'
                                            : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
                                        }`}
                                >
                                    {/* Active Indicator */}
                                    {isActive && (
                                        <motion.div
                                            className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-full"
                                            layoutId="activeIndicator"
                                            transition={{ duration: 0.2 }}
                                        />
                                    )}

                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all ${isActive
                                            ? 'bg-primary/20'
                                            : 'bg-gray-800/50 group-hover:bg-gray-700/50'
                                        }`}>
                                        <item.icon className={`w-5 h-5 ${isActive ? 'text-primary-light' : ''}`} />
                                    </div>

                                    <AnimatePresence>
                                        {sidebarOpen && (
                                            <motion.span
                                                className="font-medium whitespace-nowrap"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.15 }}
                                            >
                                                {item.label}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Live Stats Panel */}
                    <AnimatePresence>
                        {sidebarOpen && (
                            <motion.div
                                className="p-4 border-t border-gray-800/50"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="p-4 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50">
                                    <div className="flex items-center gap-2.5 mb-4">
                                        <Activity className="w-5 h-5 text-emerald-400" />
                                        <span className="text-sm font-semibold text-white">Live Stats</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="text-center">
                                            <p className="text-3xl font-bold text-white">{stats.activeCalls}</p>
                                            <p className="text-xs text-gray-500 mt-1">Active</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-3xl font-bold text-emerald-400">{stats.resolutionRate}%</p>
                                            <p className="text-xs text-gray-500 mt-1">Resolution</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Toggle Button */}
                    <button
                        onClick={toggleSidebar}
                        className="hidden lg:flex absolute -right-4 top-24 w-8 h-8 bg-gray-800 border border-gray-700 rounded-full items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 hover:border-gray-600 transition-all shadow-lg z-50"
                    >
                        {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </button>
                </div>
            </motion.aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen min-w-0">
                {/* Header */}
                <header className="h-20 bg-gray-900/80 backdrop-blur-xl border-b border-gray-800/50 flex items-center justify-between px-6 sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleSidebar}
                            className="lg:hidden p-2.5 hover:bg-gray-800 rounded-xl transition-colors"
                        >
                            <Menu className="w-5 h-5" />
                        </button>

                        {/* Search */}
                        <div className={`relative transition-all ${searchFocused ? 'w-80' : 'w-64'}`}>
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search calls, transcripts..."
                                className="input pl-11 pr-4 py-3 w-full"
                                onFocus={() => setSearchFocused(true)}
                                onBlur={() => setSearchFocused(false)}
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Voice Demo Button */}
                        <Link to="/demo" className="btn btn-saffron">
                            <Mic className="w-4 h-4" />
                            <span className="hidden sm:inline">Voice Demo</span>
                        </Link>

                        {/* Notifications */}
                        <button className="relative p-3 hover:bg-gray-800 rounded-xl transition-colors group">
                            <Bell className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-gray-900" />
                        </button>

                        {/* User Avatar */}
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-sm font-bold cursor-pointer hover:shadow-lg hover:shadow-primary/20 transition-shadow">
                            A
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-6 lg:p-8 overflow-auto">
                    <Outlet />
                </main>
            </div>

            {/* Mobile Overlay */}
            <AnimatePresence>
                {isMobile && sidebarOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleSidebar}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
