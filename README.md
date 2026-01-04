# SarkariSaathi 🇮🇳

**AI Voice Agent for Indian Government Services**

A production-ready, multilingual AI voice calling agent designed for Indian government services. Handles both inbound and outbound phone calls with human-like natural conversation in Hindi/English.

![Dashboard](https://img.shields.io/badge/Status-MVP%20Ready-brightgreen)
![License](https://img.shields.io/badge/License-Apache%202.0-blue)
![Made in India](https://img.shields.io/badge/Made%20in-India-orange)

## 🎯 Features

### For Citizens
- **24/7 Automated Helpline** - AI answers instantly, no wait time
- **Multilingual Support** - Hindi, English, Hinglish code-switching
- **Natural Conversation** - Handles interruptions, clarifying questions
- **Instant Information** - Voter ID status, polling booth, MCD services
- **Voice-Based Grievance Filing** - Speak complaint, get instant ticket

### For Government Officials
- **Real-Time Dashboard** - Live call monitoring, sentiment analysis
- **Analytics** - Call volume, department breakdown, peak hours
- **Call History** - Searchable records with transcripts
- **Multi-Department Integration** - Voter DB, HRMS, Grievance systems

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/diiviikk5/Project-SS.git
cd Project-SS

# Install dependencies
npm install

# Add your OpenRouter API key (optional - works with mock responses)
echo "VITE_OPENROUTER_API_KEY=your_key_here" > .env

# Start development server
npm run dev
```

Open http://localhost:5173 in your browser.

## 🛠️ Tech Stack

| Component | Technology |
|-----------|------------|
| Frontend | React 19 + Vite |
| Styling | Vanilla CSS with Design System |
| State | Zustand |
| Charts | Recharts |
| Animations | Framer Motion |
| Voice | Web Speech API |
| AI | OpenRouter (Llama 3.2) |

## 📱 Pages

- **/** - Landing page with features & CTA
- **/demo** - Interactive voice demo
- **/dashboard** - Real-time call monitoring
- **/dashboard/calls** - Live calls with transcripts
- **/dashboard/analytics** - Performance charts
- **/dashboard/history** - Call records
- **/dashboard/settings** - Configuration

## 🎤 Voice Demo

The voice demo uses browser's Web Speech API:

1. Click "Start Call" button
2. Click microphone to speak
3. Speak in Hindi or English
4. AI responds naturally

**Sample queries:**
- "मुझे अपने वोटर आईडी का स्टेटस जानना है"
- "What is my property tax amount?"
- "I want to file a complaint about road repair"

## 🔐 Environment Variables

```env
VITE_OPENROUTER_API_KEY=your_openrouter_key  # Optional
```

Get a free API key from [OpenRouter](https://openrouter.ai/) for real AI responses.

## 📊 Problem Statements Addressed

1. **AI-Based Talking Agent** - Primary focus
2. **One Nation One Election** - Voter awareness & misinformation control
3. **HRMS Platform for MCD** - Employee support queries
4. **Civic Tech** - Citizen grievance handling

## 🏗️ Architecture

```
Phone Call → STT (Web Speech API) → LLM (OpenRouter) → TTS (Browser) → Phone
                                         ↓
                                   RAG System
                                   (Govt. Knowledge)
```

## 📝 License

Apache 2.0 - Open source for government transparency

---

Made with ❤️ for Bharat
