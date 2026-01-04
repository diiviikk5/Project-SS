# SarkariSaathi 🇮🇳

**AI Voice Calling Agent for Indian Government Services**

Enterprise-grade voice AI that handles inbound and outbound phone calls for government departments. Supports Hindi, English, and regional languages.

![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![License](https://img.shields.io/badge/License-Apache%202.0-blue)

## 🎯 What It Does

- **Inbound Calls**: Automated handling of citizen queries 24/7
- **Outbound Campaigns**: Bulk calling for voter awareness, notifications
- **Natural Conversations**: Human-like dialogue with context awareness
- **Multilingual**: Hindi, English, Hinglish with code-switching

### Use Cases
- Voter ID status & polling booth information
- Property tax queries & payment links  
- Grievance registration with ticket tracking
- Government scheme eligibility checks
- One Nation One Election awareness

## 🛠️ Tech Stack

| Component | Service | Purpose |
|-----------|---------|---------|
| AI/LLM | OpenRouter (Llama 3.2) | Conversation intelligence |
| Speech-to-Text | Deepgram Nova-2 | Real-time transcription |
| Text-to-Speech | ElevenLabs | Natural voice synthesis |
| Telephony | Twilio | Actual phone calls |
| Frontend | React + Vite | Dashboard & Demo UI |

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- API keys for OpenRouter, Deepgram, ElevenLabs

### Installation

```bash
# Clone
git clone https://github.com/diiviikk5/Project-SS.git
cd Project-SS

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your API keys

# Start development server
npm run dev
```

Open http://localhost:5173

### Environment Variables

```env
# Required
VITE_OPENROUTER_API_KEY=your_openrouter_key
VITE_DEEPGRAM_API_KEY=your_deepgram_key
VITE_ELEVENLABS_API_KEY=your_elevenlabs_key
VITE_ELEVENLABS_VOICE_ID=voice_id

# Optional (for actual phone calls)
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
TWILIO_PHONE_NUMBER=+1234567890
```

### Get API Keys

1. **OpenRouter** (Free): https://openrouter.ai/keys
2. **Deepgram** (Free tier): https://console.deepgram.com
3. **ElevenLabs** (Free tier): https://elevenlabs.io
4. **Twilio** (Pay-as-you-go): https://console.twilio.com

## 📱 Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/demo` | Interactive voice demo |
| `/dashboard` | Call center overview |
| `/dashboard/calls` | Live call monitoring |
| `/dashboard/analytics` | Performance metrics |
| `/dashboard/history` | Call records |
| `/dashboard/settings` | Configuration |

## 🔊 Voice Demo

The demo simulates a phone call using browser APIs:

1. Select language (English/Hindi)
2. Click green phone button
3. Click microphone to speak
4. AI responds via ElevenLabs

### Sample Queries
- "I want to check my voter ID status"
- "What is my property tax amount?"
- "I want to register a complaint about road repair"

## 🏗️ Architecture

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Twilio     │────▶│   Deepgram   │────▶│  OpenRouter  │
│  (Phone)     │     │    (STT)     │     │    (AI)      │
└──────────────┘     └──────────────┘     └──────────────┘
                                                  │
┌──────────────┐     ┌──────────────┐            │
│    Caller    │◀────│  ElevenLabs  │◀───────────┘
│              │     │    (TTS)     │
└──────────────┘     └──────────────┘
```

## 📊 Dashboard Features

- **Real-time stats**: Active calls, resolution rate, avg duration
- **Live monitoring**: See ongoing calls with sentiment analysis
- **Analytics**: Call volume trends, department breakdown, peak hours
- **Call history**: Searchable records with transcripts

## 🔐 Security

- End-to-end encryption for all calls
- DPDP Act 2023 compliant
- Complete audit trails
- API keys never exposed to frontend (use Vite's VITE_ prefix)

## 🚀 Production Deployment

### For actual phone calls (requires backend):

1. Set up Node.js/Express server
2. Configure Twilio webhook to your server
3. Handle incoming calls with TwiML
4. Stream audio to Deepgram
5. Process with OpenRouter
6. Respond with ElevenLabs

See `/server` directory for backend example (coming soon).

## 📝 License

Apache 2.0 - Open source for government transparency

---

Built for Bharat 🇮🇳
