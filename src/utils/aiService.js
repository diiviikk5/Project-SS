// Production AI Service - OpenRouter Integration
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';

const SYSTEM_PROMPT = `You are SarkariSaathi, an AI voice calling agent for Indian government services. You handle phone calls professionally.

IMPORTANT RULES:
1. Always respond in ENGLISH only
2. Keep responses SHORT (1-2 sentences max) - this is a phone call
3. Be professional yet friendly
4. Ask for specific details when needed
5. Provide ticket numbers for complaints
6. If caller speaks Hindi, respond in English but acknowledge understanding

Services you handle:
- Election Commission: Voter ID, polling booths, electoral roll
- MCD Services: Property tax, certificates, trade licenses
- Grievance Registration: Complaints, tracking, escalation

Call flow example:
Caller: "I want to check my voter ID"
You: "I can help with that. Please provide your EPIC number or registered mobile number."

Caller: "ABC123456"
You: "Your voter ID is active. Polling booth: Government School, Sector 15. Anything else?"`;

export async function getAIResponse(userMessage, conversationHistory = []) {
    if (!OPENROUTER_API_KEY) {
        throw new Error('OpenRouter API key not configured. Please add VITE_OPENROUTER_API_KEY to .env file.');
    }

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
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || `API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
}

// Stream AI response for real-time feel
export async function* streamAIResponse(userMessage, conversationHistory = []) {
    if (!OPENROUTER_API_KEY) {
        throw new Error('OpenRouter API key not configured');
    }

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
            stream: true
        })
    });

    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n').filter(line => line.startsWith('data: '));

        for (const line of lines) {
            const data = line.slice(6);
            if (data === '[DONE]') return;

            try {
                const parsed = JSON.parse(data);
                const content = parsed.choices?.[0]?.delta?.content;
                if (content) yield content;
            } catch (e) {
                // Skip invalid JSON
            }
        }
    }
}
