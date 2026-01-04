import Vapi from '@vapi-ai/web';

// Initialize Vapi with Public Key
// Ideally, this should be in .env as VITE_VAPI_PUBLIC_KEY
const publicKey = import.meta.env.VITE_VAPI_PUBLIC_KEY;

if (!publicKey) {
    console.error("CRITICAL: VITE_VAPI_PUBLIC_KEY is missing! Check your .env file.");
}

const vapi = new Vapi(publicKey);

export const vapiService = {
    vapi,

    // Start a call with the specific Assistant ID we configured
    startCall: async (assistantId = '388dffb8-7d98-4c66-a846-e1d94128ec2e') => {
        try {
            console.log('Starting Vapi call with Assistant ID:', assistantId);
            return await vapi.start(assistantId);
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
