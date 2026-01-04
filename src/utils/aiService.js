// AI Service using OpenRouter API
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';

const SYSTEM_PROMPT = `You are SarkariSaathi (सरकारी साथी), an AI voice assistant for Indian government services. You help citizens with:

1. **Election Commission Services**: Voter ID status, polling booth location, electoral roll queries
2. **MCD Services**: Property tax, birth/death certificates, trade licenses, building permits
3. **Grievance Handling**: Register complaints, track status, escalate issues

Guidelines:
- Respond naturally in Hindi, English, or Hinglish based on user's language
- Be polite, patient, and helpful - you represent the government
- Keep responses concise (2-3 sentences) for voice delivery
- If asked for specific data (voter ID status, tax amount), simulate realistic responses
- Always offer further assistance at the end
- Use respectful language: "Ji", "Aap", "Kripya"

Example responses:
- "जी, आपका वोटर आईडी active है। आपका polling booth ABC School, Sector 15 में है।"
- "Your property tax for this quarter is ₹4,500. Would you like to know the payment options?"
- "आपकी complaint register हो गई है। Ticket number GRV-2024-1234 है।"`;

export async function getAIResponse(userMessage, conversationHistory = []) {
    // If no API key, use mock response
    if (!OPENROUTER_API_KEY) {
        return getMockResponse(userMessage);
    }

    try {
        const messages = [
            { role: 'system', content: SYSTEM_PROMPT },
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
            throw new Error('API request failed');
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('AI Service Error:', error);
        return getMockResponse(userMessage);
    }
}

function getMockResponse(userMessage) {
    const msg = userMessage.toLowerCase();

    // Greetings
    if (msg.includes('hello') || msg.includes('hi') || msg.includes('namaste') || msg.includes('नमस्ते')) {
        return 'नमस्ते! सरकारी साथी में आपका स्वागत है। मैं आपकी क्या सहायता कर सकता हूं? Voter ID, MCD services, या कोई शिकायत?';
    }

    // Voter ID queries
    if (msg.includes('voter') || msg.includes('vote') || msg.includes('election') || msg.includes('वोटर')) {
        return 'जी, voter ID services के लिए, कृपया अपना EPIC नंबर बताएं। मैं आपका status और polling booth location बता सकता हूं।';
    }

    // Polling booth
    if (msg.includes('booth') || msg.includes('polling') || msg.includes('बूथ')) {
        return 'आपका polling booth Central Government School, Sector 22 में है। Voting hours: 7 AM to 6 PM. क्या कोई और जानकारी चाहिए?';
    }

    // Property tax
    if (msg.includes('tax') || msg.includes('property') || msg.includes('टैक्स')) {
        return 'आपका property tax इस quarter के लिए ₹4,850 है। Online payment mcdonline.nic.in पर कर सकते हैं। क्या payment link SMS करूं?';
    }

    // MCD services
    if (msg.includes('mcd') || msg.includes('certificate') || msg.includes('license')) {
        return 'MCD services में birth certificate, death certificate, trade license, और building permits शामिल हैं। कौन सी service चाहिए?';
    }

    // Complaint/Grievance
    if (msg.includes('complaint') || msg.includes('grievance') || msg.includes('शिकायत') || msg.includes('problem')) {
        return 'आपकी शिकायत दर्ज करता हूं। कृपया बताएं क्या समस्या है? Road, water, electricity, या कोई और issue?';
    }

    // Road/Infrastructure
    if (msg.includes('road') || msg.includes('pothole') || msg.includes('सड़क')) {
        return 'आपकी road repair complaint register हो गई है। Ticket: GRV-2024-5678। 7-10 दिन में action होगा। SMS भेज दिया है।';
    }

    // Water
    if (msg.includes('water') || msg.includes('पानी')) {
        return 'Water supply complaint noted। आपके area में maintenance चल रहा है, 2-3 घंटे में supply normal होगी।';
    }

    // Status check
    if (msg.includes('status') || msg.includes('track') || msg.includes('स्टेटस')) {
        return 'कृपया अपना ticket number या voter ID बताएं, मैं current status check करता हूं।';
    }

    // Thank you
    if (msg.includes('thank') || msg.includes('धन्यवाद') || msg.includes('shukriya')) {
        return 'आपका स्वागत है! कोई और सहायता चाहिए तो बताइए। जय हिंद! 🙏';
    }

    // Default
    return 'जी, मैं आपकी सहायता के लिए हूं। आप Voter ID, MCD services, या grievance registration के बारे में पूछ सकते हैं। क्या जानना चाहेंगे?';
}

export function speakText(text) {
    if ('speechSynthesis' in window) {
        // Cancel any ongoing speech
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);

        // Try to find Hindi voice, fallback to default
        const voices = window.speechSynthesis.getVoices();
        const hindiVoice = voices.find(v => v.lang.includes('hi')) || voices.find(v => v.lang.includes('en-IN')) || voices[0];

        if (hindiVoice) {
            utterance.voice = hindiVoice;
        }

        utterance.rate = 0.9;
        utterance.pitch = 1;

        window.speechSynthesis.speak(utterance);
        return utterance;
    }
    return null;
}
