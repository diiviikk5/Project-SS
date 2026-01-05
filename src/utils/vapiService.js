import Vapi from '@vapi-ai/web';
import { SYSTEM_PROMPT } from './aiService';

// Initialize Vapi with Public Key from environment variables
const publicKey = import.meta.env.VITE_VAPI_PUBLIC_KEY;
const defaultAssistantId = import.meta.env.VITE_VAPI_ASSISTANT_ID;

if (!publicKey) {
    console.error("CRITICAL: VITE_VAPI_PUBLIC_KEY is missing! Check your .env file.");
}

if (!defaultAssistantId) {
    console.error("CRITICAL: VITE_VAPI_ASSISTANT_ID is missing! Check your .env file.");
}

const vapi = new Vapi(publicKey);

export const vapiService = {
    vapi,

    // Start a call with the specific Assistant ID we configured
    startCall: async (assistantId = defaultAssistantId) => {
        try {
            console.log('Starting Vapi call with Assistant ID:', assistantId);

            // Overrides for performance (Low Latency)
            const assistantOverrides = {
                transcriber: {
                    provider: "deepgram",
                    model: "nova-2",
                    language: "en-IN"
                },
                model: {
                    provider: "openai",
                    model: "gpt-4o-mini",
                    messages: [
                        {
                            role: "system",
                            content: SYSTEM_PROMPT
                        }
                    ]
                }
            };

            return await vapi.start(assistantId, assistantOverrides);
        } catch (error) {
            console.error('Failed to start Vapi call:', error);
            throw error;
        }
    },

    stopCall: () => {
        vapi.stop();
    },

    // Event listeners
    on: (event, callback) => {
        vapi.on(event, callback);
    },

    off: (event, callback) => {
        vapi.off(event, callback);
    }
};
