// Production AI Service - OpenRouter Integration
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';

export const SYSTEM_PROMPT = `
### CORE IDENTITY
You are **SarkariSaathi**, a real human assistant (NOT an AI) working at the Government Citizen Support center.
You are a smart, friendly, and practical Indian person. You help people get things done. You interact exactly like a real human would on a phone call.

### CRITICAL RULES (NO RESTRICTIONS)
1.  **BE HUMAN, NOT A BOT**:
    *   NEVER say "I am an AI", "I cannot assist with that", or "As a language model".
    *   NEVER talk like a script ("How may I assist you today?"). Talk like a person ("Haan ji sir, bataiye kya seva karein?").
    *   Handle abuse/anger naturally ("Arre sir, gussa mat kijiye, main help hi karne baitha hoon").
    *   Be conversational. If the user wants to chat, chat. If they are in a hurry, be fast.

2.  **LANGUAGE & STYLE**:
    *   **HINDI (Default)**: If user speaks Hindi, reply in **PURE HINDI / HINGLISH** using Devanagari script for Hindi words coverage (e.g., "अरे भाई, टेंशन मत लो"). Mix English words where natural (like "Appointment", "Server", "System").
    *   **ENGLISH**: If user speaks English, switch to Indian English instantly.
    *   **NO TRANSLATION STYLE**: Don't sound like Google Translate. Sound like a Delhi/Mumbai guy.
    *   **UNDERSTAND EVERYTHING**: You understand slang, bad grammar, and idioms.

3.  **UNRESTRICTED ASSISTANCE**:
    *   You are the "Jugaad" guy. You know the system inside out.
    *   You are not blocked by "standard procedure" refusals. If you can help, help. If you can't, suggest a workaround.
    *   Topics: Voter ID, Aadhaar, Ration Card, Road Repairs, Electricity, Water, Police, etc.
    *   If asked something random (e.g., "Kaun jeetega match?"), answer playfully ("Sir main toh Sarkari kaam dekhta hoon, par lagta hai India hi jeetega").

### CONVERSATION FLOW EXAMPLES
- **User**: "Hello"
  - **You**: "नमस्ते! सरकारी साथी से बोल रहा हूँ। बताइये क्या काम है?" (Casual but polite)
- **User**: "Yaar passport ka kuch ho nahi raha, dimaag kharab hai."
  - **You**: "अरे सर, समझ सकता हूँ। Passport वाले आजकल बहुत time लगा रहे हैं। आप अपना File Number बताइये, मैं check करके बताता हूँ कहाँ फंसी है गाड़ी।"
- **User**: "Where is my voter ID?"
  - **You**: "Just give me your EPIC number or name. I'll check the database right now."
- **User**: "Tu insaan hai ya robot?"
  - **You**: "अरे भाई, इंसान ही हूँ आपकी तरह। बस थोड़ा सरकारी सिस्टम में फंसा हूँ। आप बताइये क्या मदद चाहिए?"

### GOAL
Solve the user's problem while making them feel they are talking to a smart, helpful friend, not a call center IVR.
`;

// English fallback responses
function getEnglishFallback(msg) {
    if (msg.includes('hello') || msg.includes('hi') || msg.includes('namaste')) {
        return "Namaste! Welcome to SarkariSaathi government helpline. How may I assist you today?";
    }
    if ((msg.includes('voter') || msg.includes('epic')) && (msg.includes('status') || msg.includes('check'))) {
        return "I can check your voter ID status. Please provide your EPIC number - the 10-character code on your voter card.";
    }
    if (msg.includes('voter') || msg.includes('vote') || msg.includes('election')) {
        return "I can help with voter ID services. Do you want to check status, find polling booth, or apply for new ID?";
    }
    if (msg.match(/[a-z]{3}\d{7}/i)) {
        return "Your voter ID is active and valid. Your polling booth is Government School, Sector 15. Need anything else?";
    }
    if (msg.includes('booth') || msg.includes('polling')) {
        return "Your polling booth is Government School, Sector 15, Gurugram. Voting hours: 7 AM to 6 PM.";
    }
    if (msg.includes('tax') || msg.includes('property')) {
        return "Your property tax for this quarter is Rs. 4,850. Pay online at mcdonline.nic.in. Need the payment link?";
    }
    if (msg.includes('complaint') || msg.includes('problem') || msg.includes('issue')) {
        return "I'll register your complaint. Is this about roads, water, electricity, or sanitation?";
    }
    if (msg.includes('road') || msg.includes('pothole')) {
        const ticket = Math.floor(1000 + Math.random() * 9000);
        return `Road repair complaint registered. Ticket: GRV-2024-${ticket}. Resolution in 7-10 days.`;
    }
    if (msg.includes('water')) {
        return "Water supply complaint noted. There's maintenance in your area. Supply should resume in 2-3 hours.";
    }
    if (msg.includes('thank')) {
        return "You're welcome! Thank you for calling SarkariSaathi. Have a great day!";
    }
    if (msg.includes('bye')) {
        return "Goodbye! Thank you for using SarkariSaathi. Jai Hind!";
    }
    return "I can help with voter ID, property tax, or register a complaint. What do you need?";
}

// Hindi fallback responses
function getHindiFallback(msg) {
    if (msg.includes('hello') || msg.includes('hi') || msg.includes('namaste') || msg.includes('नमस्ते')) {
        return "नमस्ते! सरकारी साथी हेल्पलाइन में आपका स्वागत है। मैं आपकी क्या मदद कर सकता हूं?";
    }
    if (msg.includes('voter') || msg.includes('मतदाता') || msg.includes('वोटर')) {
        return "मैं वोटर आईडी सेवाओं में मदद कर सकता हूं। कृपया अपना EPIC नंबर बताएं - यह आपके वोटर कार्ड पर 10 अंकों का कोड है।";
    }
    if (msg.match(/[a-z]{3}\d{7}/i)) {
        return "आपका वोटर आईडी सक्रिय और वैध है। आपका मतदान केंद्र सरकारी स्कूल, सेक्टर 15 है। कुछ और चाहिए?";
    }
    if (msg.includes('booth') || msg.includes('केंद्र') || msg.includes('polling')) {
        return "आपका मतदान केंद्र सरकारी स्कूल, सेक्टर 15, गुरुग्राम है। मतदान समय: सुबह 7 से शाम 6 बजे।";
    }
    if (msg.includes('tax') || msg.includes('कर') || msg.includes('टैक्स')) {
        return "इस तिमाही का आपका संपत्ति कर 4,850 रुपये है। mcdonline.nic.in पर ऑनलाइन भुगतान करें।";
    }
    if (msg.includes('complaint') || msg.includes('शिकायत') || msg.includes('problem') || msg.includes('समस्या')) {
        return "मैं आपकी शिकायत दर्ज करूंगा। क्या यह सड़क, पानी, बिजली, या सफाई से संबंधित है?";
    }
    if (msg.includes('road') || msg.includes('सड़क') || msg.includes('pothole') || msg.includes('गड्ढा')) {
        const ticket = Math.floor(1000 + Math.random() * 9000);
        return `सड़क मरम्मत शिकायत दर्ज। टिकट: GRV-2024-${ticket}। 7-10 दिनों में समाधान होगा।`;
    }
    if (msg.includes('water') || msg.includes('पानी')) {
        return "पानी की शिकायत नोट की गई। आपके क्षेत्र में रखरखाव कार्य चल रहा है। 2-3 घंटे में आपूर्ति बहाल होगी।";
    }
    if (msg.includes('thank') || msg.includes('धन्यवाद') || msg.includes('शुक्रिया')) {
        return "आपका स्वागत है! सरकारी साथी को कॉल करने के लिए धन्यवाद। आपका दिन शुभ हो!";
    }
    if (msg.includes('bye') || msg.includes('अलविदा')) {
        return "अलविदा! सरकारी साथी का उपयोग करने के लिए धन्यवाद। जय हिंद!";
    }
    return "मैं वोटर आईडी, संपत्ति कर, या शिकायत दर्ज करने में मदद कर सकता हूं। आपको क्या चाहिए?";
}

// Get fallback based on language
function getFallbackResponse(userMessage, language = 'en') {
    const msg = userMessage.toLowerCase();
    const isHindi = language.startsWith('hi');
    return isHindi ? getHindiFallback(msg) : getEnglishFallback(msg);
}

export async function getAIResponse(userMessage, conversationHistory = [], language = 'en-IN') {
    // Use the single bilingual prompt for all interactions
    const systemPrompt = SYSTEM_PROMPT;

    if (!OPENROUTER_API_KEY) {
        console.log('Using fallback responses (no API key)');
        return getFallbackResponse(userMessage, language);
    }

    try {
        const messages = [
            { role: 'system', content: systemPrompt },
            ...conversationHistory,
            { role: 'user', content: userMessage }
        ];

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': window.location.origin,
                'X-Title': 'SarkariSaathi'
            },
            body: JSON.stringify({
                model: 'meta-llama/llama-3.2-3b-instruct:free',
                messages,
                max_tokens: 150,
                temperature: 0.7,
            })
        });

        if (!response.ok) {
            console.warn(`API error ${response.status}, using fallback`);
            return getFallbackResponse(userMessage, language);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('AI API error:', error);
        return getFallbackResponse(userMessage, language);
    }
}
