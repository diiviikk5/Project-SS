import { create } from 'zustand';
import { mockCalls, mockStats, mockCallHistory } from '../utils/mockData';

export const useAppStore = create((set, get) => ({
    // Active calls
    activeCalls: mockCalls,
    callHistory: mockCallHistory,
    stats: mockStats,

    // Voice demo state
    isListening: false,
    currentTranscript: [],
    isProcessing: false,

    // UI state
    sidebarOpen: true,
    currentPage: 'dashboard',

    // Actions
    toggleSidebar: () => set(state => ({ sidebarOpen: !state.sidebarOpen })),
    setCurrentPage: (page) => set({ currentPage: page }),

    // Voice actions
    setListening: (listening) => set({ isListening: listening }),
    setProcessing: (processing) => set({ isProcessing: processing }),

    addTranscriptEntry: (entry) => set(state => ({
        currentTranscript: [...state.currentTranscript, {
            ...entry,
            id: Date.now(),
            time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        }]
    })),

    clearTranscript: () => set({ currentTranscript: [] }),

    // Simulate real-time updates
    updateCallDurations: () => set(state => ({
        activeCalls: state.activeCalls.map(call => ({
            ...call,
            duration: call.status === 'active' ? call.duration + 1 : call.duration
        }))
    })),

    // Add new call
    addCall: (call) => set(state => ({
        activeCalls: [call, ...state.activeCalls],
        stats: {
            ...state.stats,
            activeCalls: state.stats.activeCalls + 1,
            totalCalls: state.stats.totalCalls + 1
        }
    })),

    // End call
    endCall: (callId) => set(state => {
        const call = state.activeCalls.find(c => c.id === callId);
        return {
            activeCalls: state.activeCalls.filter(c => c.id !== callId),
            callHistory: call ? [{
                ...call,
                status: 'completed',
                resolution: 'resolved',
                time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })
            }, ...state.callHistory] : state.callHistory,
            stats: {
                ...state.stats,
                activeCalls: Math.max(0, state.stats.activeCalls - 1)
            }
        };
    }),
}));
