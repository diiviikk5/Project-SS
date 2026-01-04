import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Phone, Mic, Cpu, Globe, Shield, Zap,
    ArrowRight, Star, Play, CheckCircle2,
    BarChart3, Users, Volume2, Radio
} from 'lucide-react';
import { useRef } from 'react';

const HeroSection = () => {
    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-500/20 blur-[120px] rounded-full opacity-50 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-saffron/10 blur-[120px] rounded-full opacity-30 pointer-events-none" />

            <div className="container px-4 mx-auto relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 hover:bg-white/10 transition-colors cursor-default"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-saffron opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-saffron"></span>
                    </span>
                    <span className="text-sm font-medium text-gray-300">SarkariSaathi AI Agent v2.0 Live</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-white/90 to-white/50"
                >
                    The Voice of <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-br from-saffron via-orange-500 to-indigo-500">
                        Digital India.
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light"
                >
                    A hyper-realistic AI telephony agent that speaks <span className="text-white font-medium">Hindi & English</span> fluently.
                    Resolving citizen queries at scale, 24/7.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link to="/demo" className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-white px-8 font-medium text-black transition-all duration-300 hover:bg-gray-100 hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)]">
                        <span className="mr-2">Try Live Demo</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 transition-opacity duration-500 group-hover:opacity-10" />
                    </Link>
                    <Link to="/dashboard" className="inline-flex h-12 items-center justify-center rounded-full border border-white/10 bg-white/5 px-8 font-medium text-white transition-all hover:bg-white/10 backdrop-blur-sm hover:scale-105">
                        <BarChart3 className="mr-2 h-4 w-4" />
                        View Dashboard
                    </Link>
                </motion.div>
            </div>

            {/* Hero Visualizer Mockup */}
            <motion.div
                initial={{ opacity: 0, y: 100, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.5, ease: "circOut" }}
                className="relative mt-20 w-full max-w-5xl mx-auto px-4 perspective-1000"
            >
                <div className="relative rounded-t-3xl border border-white/10 bg-[#0A0A0A]/50 backdrop-blur-xl shadow-2xl overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-saffron/5 via-transparent to-indigo-500/5 opacity-50" />
                    <div className="grid grid-cols-12 gap-0 border-b border-white/5">
                        {/* Sidebar Mock */}
                        <div className="hidden md:block col-span-3 border-r border-white/5 p-6 space-y-4">
                            <div className="h-2 w-20 bg-white/10 rounded mb-8" />
                            <div className="space-y-3">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="flex items-center gap-3 opacity-50">
                                        <div className="h-8 w-8 rounded-full bg-white/5" />
                                        <div className="h-2 w-24 bg-white/5 rounded" />
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Main Content Mock */}
                        <div className="col-span-12 md:col-span-9 p-8">
                            <div className="flex justify-between items-center mb-8">
                                <div className="space-y-2">
                                    <div className="h-6 w-48 bg-white/10 rounded" />
                                    <div className="h-3 w-32 bg-white/5 rounded" />
                                </div>
                                <div className="h-10 w-32 bg-saffron/20 rounded-full border border-saffron/30" />
                            </div>
                            <div className="grid grid-cols-3 gap-4 mb-8">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="h-32 rounded-2xl bg-white/5 border border-white/5" />
                                ))}
                            </div>
                            <div className="h-64 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/5 relative overflow-hidden flex items-center justify-center">
                                <div className="absolute inset-0 bg-grid-white opacity-20" />
                                <div className="w-32 h-32 rounded-full bg-saffron/20 blur-[50px] animate-pulse" />
                                <div className="relative z-10 text-center space-y-2">
                                    <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-saffron to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
                                        <Phone className="w-6 h-6 text-white" />
                                    </div>
                                    <p className="text-sm font-medium text-gray-400">CONNECTING TO AGENT...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Reflection */}
                <div className="absolute top-full left-0 right-0 h-32 bg-gradient-to-b from-[#0A0A0A] to-transparent opacity-50 blur-xl transform scale-y-[-1]" />
            </motion.div>
        </section>
    );
}

const FeatureCard = ({ icon: Icon, title, desc, delay, className }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay }}
        viewport={{ once: true }}
        className={`group relative p-8 rounded-3xl bg-[#0A0A0A] border border-white/5 hover:border-white/10 transition-all hover:bg-white/[0.02] overflow-hidden ${className}`}
    >
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <Icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
            <p className="text-gray-400 font-light leading-relaxed">{desc}</p>
        </div>
    </motion.div>
);

const FeaturesGrid = () => {
    return (
        <section className="py-32 px-4 relative">
            <div className="container mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Intelligence at Scale.</h2>
                    <p className="text-xl text-gray-400 font-light">
                        Built for governments that need to communicate with millions of citizens instantly, accurately, and empathetically.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[300px]">
                    <FeatureCard
                        icon={Globe}
                        title="Hyper-Bilingual"
                        desc="Switches effortlessly between Hindi and English (Hinglish) mid-sentence, just like a native speaker."
                        delay={0.1}
                        className="lg:col-span-2 lg:row-span-2 bg-gradient-to-br from-[#0F0F0F] to-[#050505]"
                    />
                    <FeatureCard
                        icon={Zap}
                        title="Sub-Second Latency"
                        desc="Powered by Groq LPU inference for instant, human-like voice responses."
                        delay={0.2}
                    />
                    <FeatureCard
                        icon={Shield}
                        title="Enterprise Secure"
                        desc="DPDP Act compliant. End-to-end encryption for all citizen data."
                        delay={0.3}
                    />
                    <FeatureCard
                        icon={Phone}
                        title="Telephony Gateway"
                        desc="Connects directly to PSTN networks via Twilio/Vapi integration."
                        delay={0.4}
                    />
                    <FeatureCard
                        icon={LineChart}
                        title="Live Analytics"
                        desc="Real-time dashboard for monitoring call sentiment and resolution rates."
                        delay={0.5}
                    />
                </div>
            </div>
        </section>
    );
};

// Renamed from BarChart3 to use alias or imported Icon because lucide-react exports BarChart3
const LineChart = BarChart3;

const Footer = () => (
    <footer className="py-12 border-t border-white/5 bg-[#050505]">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-saffron to-indigo-600 flex items-center justify-center">
                    <span className="text-white font-bold">S</span>
                </div>
                <span className="text-white font-medium">SarkariSaathi</span>
            </div>
            <div className="flex gap-8">
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                <a href="#" className="hover:text-white transition-colors">Terms</a>
                <a href="#" className="hover:text-white transition-colors">Twitter</a>
                <a href="#" className="hover:text-white transition-colors">GitHub</a>
            </div>
            <div>
                © 2024 Antigravity AI. All rights reserved.
            </div>
        </div>
    </footer>
);

export default function Landing() {
    return (
        <div className="bg-background text-foreground selection:bg-saffron/30">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/50 backdrop-blur-xl">
                <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/5">
                            <span className="text-saffron font-bold text-xl">S</span>
                        </div>
                        <span className="font-semibold tracking-tight">Sarkari<span className="text-gray-500">Saathi</span></span>
                    </div>
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
                        <a href="#features" className="hover:text-white transition-colors">Capabilities</a>
                        <a href="#demo" className="hover:text-white transition-colors">Live Demo</a>
                        <a href="#use-cases" className="hover:text-white transition-colors">Use Cases</a>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link to="/demo" className="text-sm font-medium hover:text-white transition-colors">Log in</Link>
                        <Link to="/demo" className="text-sm font-medium bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition-colors">
                            Start Call
                        </Link>
                    </div>
                </div>
            </nav>

            <HeroSection />
            <FeaturesGrid />
            <Footer />
        </div>
    );
}
