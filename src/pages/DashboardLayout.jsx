import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
    Bot
} from 'lucide-react';
import { useAppStore } from '../stores/appStore';

const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
    { path: '/dashboard/calls', icon: Phone, label: 'Live Calls' },
    { path: '/dashboard/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/dashboard/history', icon: History, label: 'Call History' },
    { path: '/dashboard/settings', icon: Settings, label: 'Settings' },
];

export default function DashboardLayout() {
    const location = useLocation();
    const { sidebarOpen, toggleSidebar, stats } = useAppStore();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <div className="min-h-screen bg-gray-950 flex">
            {/* Sidebar */}
            <motion.aside
                className={`fixed lg:static inset-y-0 left-0 z-40 bg-gray-900/95 backdrop-blur-xl border-r border-gray-800 flex flex-col ${isMobile && !sidebarOpen ? '-translate-x-full' : 'translate-x-0'
                    } transition-transform lg:transition-none`}
                animate={{ width: sidebarOpen ? 260 : 80 }}
                transition={{ duration: 0.2 }}
            >
                {/* Logo */}
                <div className="h-16 flex items-center px-4 border-b border-gray-800">
                    <Link to="/" className="flex items-center gap-3 overflow-hidden">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-saffron to-primary flex items-center justify-center shrink-0">
                            <Bot className="w-5 h-5 text-white" />
                        </div>
                        {sidebarOpen && (
                            <motion.span
                                className="font-bold whitespace-nowrap"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <span className="text-saffron">Sarkari</span>
                                <span className="text-white">Saathi</span>
                            </motion.span>
                        )}
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path ||
                            (item.path !== '/dashboard' && location.pathname.startsWith(item.path));

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                        ? 'bg-primary/20 text-primary-light'
                                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                    }`}
                            >
                                <item.icon className="w-5 h-5 shrink-0" />
                                {sidebarOpen && (
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="whitespace-nowrap"
                                    >
                                        {item.label}
                                    </motion.span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Quick Stats */}
                {sidebarOpen && (
                    <motion.div
                        className="p-4 border-t border-gray-800"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <div className="card p-4">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="live-dot" />
                                <span className="text-sm font-medium">Live Stats</span>
                            </div>
                            <div className="grid grid-cols-2 gap-3 text-center">
                                <div>
                                    <p className="text-2xl font-bold text-white">{stats.activeCalls}</p>
                                    <p className="text-xs text-gray-500">Active Calls</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-success">{stats.resolutionRate}%</p>
                                    <p className="text-xs text-gray-500">Resolution</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Toggle Button */}
                <button
                    onClick={toggleSidebar}
                    className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 bg-gray-800 border border-gray-700 rounded-full items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                >
                    {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
            </motion.aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen">
                {/* Header */}
                <header className="h-16 bg-gray-900/80 backdrop-blur-xl border-b border-gray-800 flex items-center justify-between px-6 sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleSidebar}
                            className="lg:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
                        >
                            <Menu className="w-5 h-5" />
                        </button>

                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search calls, transcripts..."
                                className="input pl-10 w-64 lg:w-80"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link to="/demo" className="btn btn-saffron text-sm">
                            <Phone className="w-4 h-4" />
                            Voice Demo
                        </Link>

                        <button className="relative p-2 hover:bg-gray-800 rounded-lg transition-colors">
                            <Bell className="w-5 h-5 text-gray-400" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full" />
                        </button>

                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-sm font-medium">
                            A
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-6 overflow-auto">
                    <Outlet />
                </main>
            </div>

            {/* Mobile Overlay */}
            {isMobile && sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={toggleSidebar}
                />
            )}
        </div>
    );
}
