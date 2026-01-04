import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    User,
    Bell,
    Shield,
    Globe,
    Palette,
    Volume2,
    Save,
    CheckCircle2
} from 'lucide-react';

export default function Settings() {
    const [saved, setSaved] = useState(false);
    const [settings, setSettings] = useState({
        language: 'hi-IN',
        voiceSpeed: 0.9,
        autoGreeting: true,
        ttsEnabled: true,
        darkMode: true,
        notifications: true,
        callRecording: true,
        transcriptSave: true,
    });

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="space-y-6 max-w-3xl">
            {/* Page Title */}
            <div>
                <h1 className="text-2xl font-bold">Settings</h1>
                <p className="text-gray-500">Configure your SarkariSaathi preferences</p>
            </div>

            {/* Profile Section */}
            <motion.div
                className="card p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="flex items-center gap-3 mb-6">
                    <User className="w-5 h-5 text-primary" />
                    <h2 className="text-lg font-semibold">Profile</h2>
                </div>

                <div className="flex items-center gap-6 mb-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-2xl font-bold">
                        A
                    </div>
                    <div>
                        <h3 className="text-lg font-medium">Admin User</h3>
                        <p className="text-gray-500">admin@sarkarisaathi.gov.in</p>
                        <span className="badge badge-primary mt-2">Super Admin</span>
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm text-gray-400 mb-1 block">Full Name</label>
                        <input type="text" className="input" defaultValue="Admin User" />
                    </div>
                    <div>
                        <label className="text-sm text-gray-400 mb-1 block">Email</label>
                        <input type="email" className="input" defaultValue="admin@sarkarisaathi.gov.in" />
                    </div>
                </div>
            </motion.div>

            {/* Voice Settings */}
            <motion.div
                className="card p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <div className="flex items-center gap-3 mb-6">
                    <Volume2 className="w-5 h-5 text-saffron" />
                    <h2 className="text-lg font-semibold">Voice Agent Settings</h2>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="text-sm text-gray-400 mb-2 block">Primary Language</label>
                        <select
                            className="input"
                            value={settings.language}
                            onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                        >
                            <option value="hi-IN">Hindi (हिंदी)</option>
                            <option value="en-IN">English (India)</option>
                            <option value="hi-EN">Hinglish (Code-switching)</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-sm text-gray-400 mb-2 block">
                            Voice Speed: {settings.voiceSpeed}x
                        </label>
                        <input
                            type="range"
                            min="0.5"
                            max="1.5"
                            step="0.1"
                            value={settings.voiceSpeed}
                            onChange={(e) => setSettings({ ...settings, voiceSpeed: parseFloat(e.target.value) })}
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Auto Greeting</p>
                            <p className="text-sm text-gray-500">Play welcome message on call start</p>
                        </div>
                        <button-
                            onClick={() => setSettings({ ...settings, autoGreeting: !settings.autoGreeting })}
                            className={`w-12 h-6 rounded-full transition-colors ${settings.autoGreeting ? 'bg-primary' : 'bg-gray-600'}`}
                        >
                            <div className={`w-5 h-5 bg-white rounded-full transition-transform ${settings.autoGreeting ? 'translate-x-6' : 'translate-x-0.5'}`} />
                        </button->
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Text-to-Speech</p>
                            <p className="text-sm text-gray-500">Enable voice responses</p>
                        </div>
                        <button
                            onClick={() => setSettings({ ...settings, ttsEnabled: !settings.ttsEnabled })}
                            className={`w-12 h-6 rounded-full transition-colors flex items-center ${settings.ttsEnabled ? 'bg-primary' : 'bg-gray-600'}`}
                        >
                            <div className={`w-5 h-5 bg-white rounded-full transition-transform ${settings.ttsEnabled ? 'translate-x-6' : 'translate-x-0.5'}`} />
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Privacy & Security */}
            <motion.div
                className="card p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <div className="flex items-center gap-3 mb-6">
                    <Shield className="w-5 h-5 text-success" />
                    <h2 className="text-lg font-semibold">Privacy & Security</h2>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Call Recording</p>
                            <p className="text-sm text-gray-500">Record all calls for quality assurance</p>
                        </div>
                        <button
                            onClick={() => setSettings({ ...settings, callRecording: !settings.callRecording })}
                            className={`w-12 h-6 rounded-full transition-colors flex items-center ${settings.callRecording ? 'bg-primary' : 'bg-gray-600'}`}
                        >
                            <div className={`w-5 h-5 bg-white rounded-full transition-transform ${settings.callRecording ? 'translate-x-6' : 'translate-x-0.5'}`} />
                        </button>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Save Transcripts</p>
                            <p className="text-sm text-gray-500">Store call transcripts for 90 days</p>
                        </div>
                        <button
                            onClick={() => setSettings({ ...settings, transcriptSave: !settings.transcriptSave })}
                            className={`w-12 h-6 rounded-full transition-colors flex items-center ${settings.transcriptSave ? 'bg-primary' : 'bg-gray-600'}`}
                        >
                            <div className={`w-5 h-5 bg-white rounded-full transition-transform ${settings.transcriptSave ? 'translate-x-6' : 'translate-x-0.5'}`} />
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Save Button */}
            <motion.div
                className="flex justify-end"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                <button
                    onClick={handleSave}
                    className={`btn ${saved ? 'btn-success' : 'btn-primary'}`}
                >
                    {saved ? (
                        <>
                            <CheckCircle2 className="w-4 h-4" />
                            Saved!
                        </>
                    ) : (
                        <>
                            <Save className="w-4 h-4" />
                            Save Changes
                        </>
                    )}
                </button>
            </motion.div>
        </div>
    );
}
