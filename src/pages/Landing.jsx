import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Phone,
    PhoneCall,
    PhoneIncoming,
    PhoneOutgoing,
    Bot,
    Globe2,
    Clock,
    Shield,
    BarChart3,
    Mic,
    ArrowRight,
    Zap,
    Users,
    CheckCircle2,
    Building2,
    Sparkles,
    HeadphonesIcon,
    TrendingUp,
    Star,
    Play,
    Radio,
    Server,
    Database,
    Cpu,
    Volume2,
    Languages
} from 'lucide-react';
import { useRef } from 'react';

const stats = [
    { value: '24/7', label: 'Automated Calls', icon: Clock },
    { value: '<1s', label: 'Response Latency', icon: Zap },
    { value: '10+', label: 'Languages', icon: Languages },
    { value: '99.9%', label: 'Uptime', icon: Server },
];

const features = [
    {
        icon: PhoneIncoming,
        title: 'Inbound Calls',
        description: 'Handle citizen queries 24/7. Voter ID status, tax information, complaint registration - all automated.',
        gradient: 'from-emerald-500 to-teal-600',
    },
    {
        icon: PhoneOutgoing,
        title: 'Outbound Campaigns',
        description: 'Bulk calling for voter awareness, scheme notifications, survey collection, and proactive citizen outreach.',
        gradient: 'from-blue-500 to-indigo-600',
    },
    {
        icon: Bot,
        title: 'Natural Conversations',
        description: 'Human-like dialogue with context awareness. Handles interruptions, follow-ups, and multi-turn conversations.',
        gradient: 'from-purple-500 to-pink-600',
    },
    {
        icon: Globe2,
        title: 'Multilingual Support',
        description: 'Hindi, English, and regional languages with automatic code-switching and accent recognition.',
        gradient: 'from-orange-500 to-amber-600',
    },
    {
        icon: BarChart3,
        title: 'Real-Time Analytics',
        description: 'Live call monitoring, sentiment analysis, department-wise breakdown, and actionable insights.',
        gradient: 'from-cyan-500 to-blue-600',
    },
    {
        icon: Shield,
        title: 'Enterprise Security',
        description: 'End-to-end encryption, DPDP Act 2023 compliant, complete audit trails, and data sovereignty.',
        gradient: 'from-rose-500 to-pink-600',
    },
];

const techStack = [
    { name: 'Deepgram', desc: 'Speech-to-Text', icon: Mic },
    { name: 'ElevenLabs', desc: 'Text-to-Speech', icon: Volume2 },
    { name: 'Twilio', desc: 'Telephony', icon: Phone },
    { name: 'OpenRouter', desc: 'AI/LLM', icon: Cpu },
];

const useCases = [
    'Voter ID Status & Polling Booth Location',
    'Property Tax Queries & Online Payment Links',
    'Grievance Registration with Ticket Tracking',
    'One Nation One Election Awareness',
    'Government Scheme Eligibility Checks',
    'Bulk Outbound for Event Notifications',
];

export default function Landing() {
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });

    const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

    return (
        <div className="min-h-screen overflow-hidden">
            <div className="gradient-bg" />
            <div className="grid-pattern" />

            {/* Navbar */}
            <motion.nav
                className="fixed top-0 left-0 right-0 z-50"
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="mx-6 mt-4">
                    <div className="glass-panel px-6 py-3 flex items-center justify-between max-w-7xl mx-auto">
                        <Link to="/" className="flex items-center gap-3 group">
                            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-saffron via-orange-500 to-primary flex items-center justify-center shadow-lg">
                                <PhoneCall className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold tracking-tight">
                                <span className="text-saffron">Sarkari</span>
                                <span className="text-white">Saathi</span>
                            </span>
                        </Link>

                        <div className="hidden md:flex items-center gap-2">
                            <Link to="/dashboard" className="btn btn-secondary">
                                <BarChart3 className="w-4 h-4" />
                                Dashboard
                            </Link>
                            <Link to="/demo" className="btn btn-saffron">
                                <Phone className="w-4 h-4" />
                                Try Demo Call
                            </Link>
                        </div>

                        <Link to="/demo" className="md:hidden btn btn-saffron btn-sm">
                            <Phone className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </motion.nav>

            {/* Hero Section */}
            <section ref={heroRef} className="relative pt-32 pb-20 px-6">
                <motion.div
                    className="container max-w-6xl"
                    style={{ opacity: heroOpacity, y: heroY }}
                >
                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Badge */}
                        <motion.div
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-500/20 to-primary/20 border border-emerald-500/30 mb-8"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
                            <span className="text-sm font-semibold text-emerald-300">
                                AI Voice Calling Agent
                            </span>
                        </motion.div>

                        {/* Headline */}
                        <motion.h1
                            className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 leading-[1.1] tracking-tight"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <span className="text-white">Automated</span>
                            <br />
                            <span className="gradient-text">Phone Calls</span>
                            <br />
                            <span className="text-white">for Government</span>
                        </motion.h1>

                        {/* Subheadline */}
                        <motion.p
                            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            Handle <span className="text-saffron font-semibold">inbound</span> and
                            <span className="text-primary-light font-semibold"> outbound</span> phone calls
                            with AI. Works with real phone numbers via Twilio integration.
                        </motion.p>

                        {/* CTA */}
                        <motion.div
                            className="flex flex-col sm:flex-row items-center justify-center gap-4"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <Link to="/demo" className="btn btn-saffron btn-lg group">
                                <Phone className="w-5 h-5" />
                                <span>Start Demo Call</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link to="/dashboard" className="btn btn-secondary btn-lg">
                                <BarChart3 className="w-5 h-5" />
                                <span>View Dashboard</span>
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-20 max-w-4xl mx-auto"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                    >
                        {stats.map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                className="card p-5 text-center hover-lift"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 + i * 0.1 }}
                            >
                                <stat.icon className="w-6 h-6 text-primary-light mx-auto mb-3" />
                                <div className="text-3xl font-extrabold text-white mb-1">{stat.value}</div>
                                <div className="text-sm text-gray-400">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </section>

            {/* Call Flow Diagram */}
            <section className="py-20 px-6">
                <div className="container max-w-5xl">
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
                        <p className="text-gray-400 text-lg">Real phone calls powered by AI</p>
                    </motion.div>

                    <motion.div
                        className="card p-8 md:p-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="grid md:grid-cols-5 gap-6 items-center text-center">
                            {/* Phone */}
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center mb-3">
                                    <Phone className="w-8 h-8 text-emerald-400" />
                                </div>
                                <p className="font-semibold text-white">Phone Call</p>
                                <p className="text-xs text-gray-500">Twilio</p>
                            </div>

                            <div className="hidden md:block text-2xl text-gray-600">→</div>

                            {/* STT */}
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-3">
                                    <Mic className="w-8 h-8 text-blue-400" />
                                </div>
                                <p className="font-semibold text-white">Speech-to-Text</p>
                                <p className="text-xs text-gray-500">Deepgram</p>
                            </div>

                            <div className="hidden md:block text-2xl text-gray-600">→</div>

                            {/* AI */}
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-3">
                                    <Cpu className="w-8 h-8 text-purple-400" />
                                </div>
                                <p className="font-semibold text-white">AI Processing</p>
                                <p className="text-xs text-gray-500">OpenRouter</p>
                            </div>

                            <div className="hidden md:block text-2xl text-gray-600">→</div>

                            {/* TTS */}
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 rounded-2xl bg-saffron/20 flex items-center justify-center mb-3">
                                    <Volume2 className="w-8 h-8 text-saffron" />
                                </div>
                                <p className="font-semibold text-white">Text-to-Speech</p>
                                <p className="text-xs text-gray-500">ElevenLabs</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features */}
            <section className="py-20 px-6">
                <div className="container max-w-6xl">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="badge badge-primary mb-4">Capabilities</span>
                        <h2 className="text-4xl font-bold mb-4">Enterprise-Grade Voice AI</h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Built for government scale with security, reliability, and compliance in mind
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, i) => (
                            <motion.div
                                key={feature.title}
                                className="card p-6 hover-lift group"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                                    <feature.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-lg font-bold mb-2 text-white">{feature.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Use Cases */}
            <section className="py-20 px-6 bg-gradient-to-b from-transparent via-gray-900/50 to-transparent">
                <div className="container max-w-5xl">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="badge badge-saffron mb-4">Use Cases</span>
                            <h2 className="text-4xl font-bold mb-6">
                                Solving Real <span className="gradient-text">Problems</span>
                            </h2>
                            <p className="text-gray-400 text-lg mb-8">
                                Deployed for election commissions, municipal corporations, and citizen grievance systems.
                            </p>

                            <div className="space-y-3">
                                {useCases.map((useCase, i) => (
                                    <motion.div
                                        key={i}
                                        className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/30 border border-gray-700/50"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                                        <span className="text-gray-200">{useCase}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            className="card p-8 text-center"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-saffron to-primary flex items-center justify-center mx-auto mb-6 shadow-2xl">
                                <PhoneCall className="w-12 h-12 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3">Try a Live Demo</h3>
                            <p className="text-gray-400 mb-6">
                                Experience the AI calling agent in action. No signup required.
                            </p>
                            <Link to="/demo" className="btn btn-saffron btn-lg w-full justify-center">
                                <Phone className="w-5 h-5" />
                                Start Demo Call
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-6">
                <div className="container max-w-4xl">
                    <motion.div
                        className="card p-12 text-center relative overflow-hidden"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-saffron/10 via-transparent to-primary/10" />

                        <div className="relative z-10">
                            <h2 className="text-4xl font-bold mb-6">
                                Ready to Automate <span className="gradient-text">Phone Calls</span>?
                            </h2>
                            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                                Deploy SarkariSaathi in your department. Handle thousands of calls simultaneously.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link to="/demo" className="btn btn-saffron btn-lg">
                                    <Phone className="w-5 h-5" />
                                    Try Demo Call
                                </Link>
                                <a
                                    href="https://github.com/diiviikk5/Project-SS"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-secondary btn-lg"
                                >
                                    <Star className="w-5 h-5" />
                                    View on GitHub
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-10 px-6 border-t border-gray-800/50">
                <div className="container max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-saffron to-primary flex items-center justify-center">
                            <PhoneCall className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-lg font-bold">
                            <span className="text-saffron">Sarkari</span>
                            <span className="text-white">Saathi</span>
                        </span>
                    </div>

                    <p className="text-sm text-gray-500">
                        © 2024 SarkariSaathi • Open Source • Apache 2.0
                    </p>
                </div>
            </footer>
        </div>
    );
}
