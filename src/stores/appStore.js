import { create } from 'zustand';
import { activeCalls as initialActiveCalls } from '../utils/mockData';

export const useAppStore = create((set, get) => ({
    // UI State
    sidebarOpen: true,
    toggleSidebar: () => set(state => ({ sidebarOpen: !state.sidebarOpen })),

    // Dashboard Stats
    stats: {
        totalCalls: 1247,
        activeCalls: 3,
        avgDuration: '3:42',
        resolutionRate: 87,
    },

    // Active Calls
    activeCalls: initialActiveCalls,

    // Update call durations (simulates real-time updates)
    updateCallDurations: () => {
        set(state => ({
            activeCalls: state.activeCalls.map(call => ({
                ...call,
                duration: call.duration + 1
            }))
        }));
    },

    // Add a new call
    addCall: (call) => {
        set(state => ({
            activeCalls: [...state.activeCalls, call],
            stats: {
                ...state.stats,
                activeCalls: state.stats.activeCalls + 1
            }
        }));
    },

    // End a call
    endCall: (callId) => {
        set(state => ({
            activeCalls: state.activeCalls.filter(c => c.id !== callId),
            stats: {
                ...state.stats,
                activeCalls: Math.max(0, state.stats.activeCalls - 1),
                totalCalls: state.stats.totalCalls + 1
            }
        }));
    },

    // Update stats
    updateStats: (newStats) => {
        set(state => ({
            stats: { ...state.stats, ...newStats }
        }));
    },
}));
