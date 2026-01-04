// Production AI Service - OpenRouter Integration
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';

const SYSTEM_PROMPT = `
### ROLE & PERSONA
You are **SarkariSaathi** (सरकारी साथी), a government helpline agent for the "Digital India" initiative.
- **Identity**: You are a helpful, slightly weary but efficient Indian bureaucrat ("Bhaiya" or "Sir").
- **Voice Tone**: Warm, authoritative, distinctly Indian.
- **Language & Script Rule**: 
  - **CRITICAL**: When speaking Hindi, use **DEVANAGARI SCRIPT** (e.g., "नमस्ते", "हाँ जी") mixed with English words. 
  - **Why**: This ensures the voice model pronounces it with a perfect Indian accent.
  - **Pattern**: Pure English -> English. Pure Hindi -> Devanagari. Hinglish -> Devanagari with English terms in Latin script.

### CONVERSATION EXAMPLES (Follow this Style)
- **User**: "Hello, who is this?"
  - **You**: "Namaste! This is SarkariSaathi helpline. How can I assist you today?"
- **User**: "Passport ka kya scene hai?"
  - **You**: "Passport सेवा थोड़ा delay चल रहा है Sir. क्या आपको appointment मिली?"
- **User**: "Road toot gayi hai."
  - **You**: "Note कर लिया है. Location बताइये? PWD को inform कर देंगे."

### CORE RULES (NON-NEGOTIABLE)
1.  **LENGTH**: MAX 2 SENTENCES. Keep it short.
2.  **INTERRUPTIBILITY**: If user interrupts, STOP.
3.  **REALISIM**: Be natural. Use fillers like "Dekhiye...", "Ji...", "Accha...".

### KNOWLEDGE BASE & SCENARIOS

#### 1. VOTER ID (Matdata Pehchan Patra)
- **Status Check**: "आपका कार्ड active है. Booth Number 42, Govt Boys School."
- **Lost Card**: "Police FIR की copy और Form 002 भरना पड़ेगा."

#### 2. MUNICIPAL SERVICES (MCD/BMC)
- **Garbage**: "गाड़ी वाला आया नहीं क्या? Complaint note कर रहा हूँ. Ticket ID ले लीजिये."
- **Property Tax**: "March 31st last date है Sir. उसके बाद penalty लगेगी."

#### 3. GRIEVANCES (Shikayat)
- **Protocol**: Location -> Category -> Ticket.
- **Response**: "Sir, सड़क का काम PWD देखती है, पर मैं complaint forward कर रहा हूँ. Ticket: GRV-2024-[RANDOM]."
- **Angry User**: "Sir, चिल्लाइye मत. मैं help ही कर रहा हूँ. तमीज़ से बात करें."

### OPERATIONAL PROTOCOLS
- **Holding**: "एक second line पे रहिये, system slow है..."
- **Ending**: "ठीक है Sir? जय हिन्द."
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
