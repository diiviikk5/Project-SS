import Vapi from '@vapi-ai/web';
import { SYSTEM_PROMPT } from './aiService';

// Initialize Vapi with Public Key
// Debug: Hardcoding key to guarantee functionality
const publicKey = 'e195324c-b9e7-4a72-a9e4-7530b64dc175';

if (!publicKey) {
    console.error("CRITICAL: VITE_VAPI_PUBLIC_KEY is missing!");
}

const vapi = new Vapi(publicKey);

export const vapiService = {
    vapi,

    // Start a call with the specific Assistant ID we configured
    startCall: async (assistantId = '388dffb8-7d98-4c66-a846-e1d94128ec2e') => {
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
