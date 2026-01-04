import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Phone,
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
    Volume2
} from 'lucide-react';

const stats = [
    { value: '24/7', label: 'Availability' },
    { value: '<1s', label: 'Response Time' },
    { value: '10+', label: 'Languages' },
    { value: '87%', label: 'Resolution Rate' },
];

const features = [
    {
        icon: Bot,
        title: 'AI-Powered Conversations',
        description: 'Natural language understanding with Hindi/English code-switching support',
        color: '#6366F1'
    },
    {
        icon: Clock,
        title: 'Zero Wait Time',
        description: 'Instant answers to citizen queries - no more long IVR menus or hold music',
        color: '#10B981'
    },
    {
        icon: Globe2,
        title: 'Multilingual Support',
        description: 'Seamless Hindi, English, and Hinglish conversations with accent recognition',
        color: '#FF9933'
    },
    {
        icon: Shield,
        title: 'Secure & Compliant',
        description: 'End-to-end encryption, DPDP Act compliant, with complete audit trails',
        color: '#EF4444'
    },
    {
        icon: BarChart3,
        title: 'Real-Time Analytics',
        description: 'Live monitoring, sentiment analysis, and data-driven policy insights',
        color: '#8B5CF6'
    },
    {
        icon: Phone,
        title: 'Outbound Campaigns',
        description: 'Bulk calling for voter awareness, event notifications, and surveys',
        color: '#F59E0B'
    },
];

const useCases = [
    { icon: CheckCircle2, text: 'Voter ID Status & Polling Booth Location' },
    { icon: CheckCircle2, text: 'Property Tax Queries & Payments' },
    { icon: CheckCircle2, text: 'Grievance Registration & Tracking' },
    { icon: CheckCircle2, text: 'One Nation One Election Awareness' },
    { icon: CheckCircle2, text: 'MCD Services & Certificates' },
    { icon: CheckCircle2, text: 'Government Scheme Information' },
];

export default function Landing() {
    return (
        <div className="min-h-screen">
            <div className="gradient-bg" />
            <div className="grid-pattern" />

            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-gray-950/80 border-b border-gray-800/50">
                <div className="container flex items-center justify-between h-16">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-saffron to-primary flex items-center justify-center">
                            <Phone className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold">
                            <span className="text-saffron">Sarkari</span>
                            <span className="text-white">Saathi</span>
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link to="/dashboard" className="btn btn-secondary">
                            Dashboard
                        </Link>
                        <Link to="/demo" className="btn btn-saffron">
                            <Mic className="w-4 h-4" />
                            Try Voice Demo
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6">
                <div className="container">
                    <motion.div
                        className="text-center max-w-4xl mx-auto"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.div
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-saffron/10 border border-saffron/30 mb-6"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Zap className="w-4 h-4 text-saffron" />
                            <span className="text-sm text-saffron font-medium">Powered by AI • Made for Bharat</span>
                        </motion.div>

                        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                            <span className="gradient-text">AI Voice Agent</span>
                            <br />
                            <span className="text-white">for Government Services</span>
                        </h1>

                        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                            Transform citizen services with intelligent voice conversations.
                            Handle inbound & outbound calls in Hindi/English with <span className="text-white font-medium">&lt;1 second response time</span>.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to="/demo" className="btn btn-primary btn-lg">
                                <Volume2 className="w-5 h-5" />
                                Start Voice Demo
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link to="/dashboard" className="btn btn-secondary btn-lg">
                                <BarChart3 className="w-5 h-5" />
                                View Dashboard
                            </Link>
                        </div>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-4xl mx-auto"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        {stats.map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                className="card p-6 text-center"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 + i * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                                <div className="text-sm text-gray-400">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Features */}
            <section className="py-20 px-6">
                <div className="container">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-bold mb-4">Why SarkariSaathi?</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Built for Indian government services with privacy-first architecture and open-source transparency
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, i) => (
                            <motion.div
                                key={feature.title}
                                className="card p-8 group"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div
                                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110"
                                    style={{ background: `${feature.color}20` }}
                                >
                                    <feature.icon className="w-7 h-7" style={{ color: feature.color }} />
                                </div>
                                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                                <p className="text-gray-400">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Use Cases */}
            <section className="py-20 px-6 bg-gray-900/50">
                <div className="container">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <Building2 className="w-6 h-6 text-saffron" />
                                <span className="text-saffron font-medium">Use Cases</span>
                            </div>
                            <h2 className="text-4xl font-bold mb-6">
                                Serving Every <span className="gradient-text">Citizen Need</span>
                            </h2>
                            <p className="text-gray-400 mb-8">
                                From voter services to municipal queries, SarkariSaathi handles 80%+ routine inquiries
                                automatically, freeing human agents for complex cases.
                            </p>

                            <div className="space-y-4">
                                {useCases.map((useCase, i) => (
                                    <motion.div
                                        key={i}
                                        className="flex items-center gap-3"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        <useCase.icon className="w-5 h-5 text-success" />
                                        <span className="text-gray-300">{useCase.text}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            className="card p-8"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="live-indicator">
                                    <span className="live-dot" />
                                    <span className="text-sm text-success font-medium">Live Demo</span>
                                </div>
                            </div>

                            <div className="bg-gray-950 rounded-xl p-6 mb-6">
                                <div className="flex items-start gap-3 mb-4">
                                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                                        <Users className="w-4 h-4 text-primary" />
                                    </div>
                                    <div className="bg-gray-800 rounded-2xl rounded-tl-none px-4 py-3">
                                        <p className="text-sm text-gray-300">मुझे अपने वोटर आईडी का स्टेटस जानना है</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 justify-end">
                                    <div className="bg-primary/20 rounded-2xl rounded-tr-none px-4 py-3 max-w-[80%]">
                                        <p className="text-sm text-gray-200">जी बिल्कुल! कृपया अपना EPIC नंबर बताएं, मैं तुरंत स्टेटस चेक करता हूं। 🙏</p>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-saffron/20 flex items-center justify-center shrink-0">
                                        <Bot className="w-4 h-4 text-saffron" />
                                    </div>
                                </div>
                            </div>

                            <Link to="/demo" className="btn btn-saffron w-full">
                                <Mic className="w-4 h-4" />
                                Try It Yourself
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-6">
                <div className="container">
                    <motion.div
                        className="card p-12 text-center max-w-4xl mx-auto relative overflow-hidden"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-saffron/10 via-transparent to-primary/10" />
                        <div className="relative z-10">
                            <h2 className="text-4xl font-bold mb-4">Ready to Transform Citizen Services?</h2>
                            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                                Deploy SarkariSaathi in your department and reduce waiting times to zero.
                                100% open-source, Apache 2.0 licensed for government transparency.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link to="/demo" className="btn btn-primary btn-lg">
                                    <Mic className="w-5 h-5" />
                                    Start Voice Demo
                                </Link>
                                <a
                                    href="https://github.com/diiviikk5/Project-SS"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-secondary btn-lg"
                                >
                                    View on GitHub
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 px-6 border-t border-gray-800">
                <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-saffron to-primary flex items-center justify-center">
                            <Phone className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-semibold">
                            <span className="text-saffron">Sarkari</span>
                            <span className="text-white">Saathi</span>
                        </span>
                    </div>
                    <p className="text-sm text-gray-500">
                        © 2024 SarkariSaathi. Open Source • Apache 2.0 License • Made with ❤️ for Bharat
                    </p>
                </div>
            </footer>
        </div>
    );
}
