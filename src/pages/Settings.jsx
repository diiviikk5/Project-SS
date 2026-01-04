import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    User,
    Bell,
    Shield,
    Globe,
    Volume2,
    Save,
    CheckCircle2,
    Settings as SettingsIcon,
    Mic,
    Lock,
    Database
} from 'lucide-react';

const Toggle = ({ enabled, onChange }) => (
    <button
        onClick={onChange}
        className={`relative w-14 h-8 rounded-full transition-colors ${enabled ? 'bg-primary' : 'bg-gray-700'
            }`}
    >
        <motion.div
            className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg"
            animate={{ x: enabled ? 28 : 4 }}
            transition={{ duration: 0.2 }}
        />
    </button>
);

const SettingRow = ({ label, description, enabled, onChange }) => (
    <div className="flex items-center justify-between p-4 rounded-xl bg-gray-800/30 border border-gray-700/50 hover:bg-gray-800/50 transition-colors">
        <div>
            <p className="font-semibold text-white">{label}</p>
            <p className="text-sm text-gray-500 mt-0.5">{description}</p>
        </div>
        <Toggle enabled={enabled} onChange={onChange} />
    </div>
);

export default function Settings() {
    const [saved, setSaved] = useState(false);
    const [settings, setSettings] = useState({
        language: 'hi-IN',
        voiceSpeed: 0.9,
        autoGreeting: true,
        ttsEnabled: true,
        notifications: true,
        callRecording: true,
        transcriptSave: true,
    });

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const updateSetting = (key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="space-y-8 max-w-3xl">
            {/* Page Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-gray-400 mt-1">Configure your SarkariSaathi preferences</p>
            </div>

            {/* Profile Section */}
            <motion.div
                className="card overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <div className="px-6 py-5 border-b border-gray-800/50 flex items-center gap-3 bg-gray-900/30">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                        <User className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                        <h2 className="font-bold text-white">Profile</h2>
                        <p className="text-xs text-gray-500">Your account information</p>
                    </div>
                </div>

                <div className="p-6">
                    <div className="flex items-center gap-6 mb-8">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary via-purple-500 to-pink-500 flex items-center justify-center text-3xl font-bold shadow-xl">
                            A
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">Admin User</h3>
                            <p className="text-gray-400">admin@sarkarisaathi.gov.in</p>
                            <span className="badge badge-primary mt-2">Super Admin</span>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm text-gray-400 mb-2 block font-medium">Full Name</label>
                            <input type="text" className="input" defaultValue="Admin User" />
                        </div>
                        <div>
                            <label className="text-sm text-gray-400 mb-2 block font-medium">Email</label>
                            <input type="email" className="input" defaultValue="admin@sarkarisaathi.gov.in" />
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Voice Settings */}
            <motion.div
                className="card overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
            >
                <div className="px-6 py-5 border-b border-gray-800/50 flex items-center gap-3 bg-gray-900/30">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
                        <Mic className="w-5 h-5 text-orange-400" />
                    </div>
                    <div>
                        <h2 className="font-bold text-white">Voice Agent</h2>
                        <p className="text-xs text-gray-500">Configure voice settings</p>
                    </div>
                </div>

                <div className="p-6 space-y-5">
                    <div>
                        <label className="text-sm text-gray-400 mb-2 block font-medium">Primary Language</label>
                        <select
                            className="input"
                            value={settings.language}
                            onChange={(e) => updateSetting('language', e.target.value)}
                        >
                            <option value="hi-IN">Hindi (हिंदी)</option>
                            <option value="en-IN">English (India)</option>
                            <option value="hi-EN">Hinglish (Code-switching)</option>
                        </select>
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-3">
                            <label className="text-sm text-gray-400 font-medium">Voice Speed</label>
                            <span className="text-sm font-semibold text-white">{settings.voiceSpeed}x</span>
                        </div>
                        <input
                            type="range"
                            min="0.5"
                            max="1.5"
                            step="0.1"
                            value={settings.voiceSpeed}
                            onChange={(e) => updateSetting('voiceSpeed', parseFloat(e.target.value))}
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                        <div className="flex justify-between text-xs text-gray-600 mt-2">
                            <span>Slow</span>
                            <span>Normal</span>
                            <span>Fast</span>
                        </div>
                    </div>

                    <SettingRow
                        label="Auto Greeting"
                        description="Play welcome message on call start"
                        enabled={settings.autoGreeting}
                        onChange={() => updateSetting('autoGreeting', !settings.autoGreeting)}
                    />

                    <SettingRow
                        label="Text-to-Speech"
                        description="Enable voice responses"
                        enabled={settings.ttsEnabled}
                        onChange={() => updateSetting('ttsEnabled', !settings.ttsEnabled)}
                    />
                </div>
            </motion.div>

            {/* Privacy & Security */}
            <motion.div
                className="card overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
            >
                <div className="px-6 py-5 border-b border-gray-800/50 flex items-center gap-3 bg-gray-900/30">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                        <h2 className="font-bold text-white">Privacy & Security</h2>
                        <p className="text-xs text-gray-500">Data protection settings</p>
                    </div>
                </div>

                <div className="p-6 space-y-4">
                    <SettingRow
                        label="Call Recording"
                        description="Record all calls for quality assurance"
                        enabled={settings.callRecording}
                        onChange={() => updateSetting('callRecording', !settings.callRecording)}
                    />

                    <SettingRow
                        label="Save Transcripts"
                        description="Store call transcripts for 90 days (DPDP compliant)"
                        enabled={settings.transcriptSave}
                        onChange={() => updateSetting('transcriptSave', !settings.transcriptSave)}
                    />

                    <SettingRow
                        label="Desktop Notifications"
                        description="Get notified about new calls and alerts"
                        enabled={settings.notifications}
                        onChange={() => updateSetting('notifications', !settings.notifications)}
                    />
                </div>
            </motion.div>

            {/* Save Button */}
            <motion.div
                className="flex justify-end"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
            >
                <button
                    onClick={handleSave}
                    className={`btn ${saved ? 'btn-success' : 'btn-primary'} btn-lg`}
                >
                    {saved ? (
                        <>
                            <CheckCircle2 className="w-5 h-5" />
                            Saved Successfully!
                        </>
                    ) : (
                        <>
                            <Save className="w-5 h-5" />
                            Save Changes
                        </>
                    )}
                </button>
            </motion.div>
        </div>
    );
}
