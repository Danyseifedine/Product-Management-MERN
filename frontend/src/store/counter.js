

import { create } from "zustand";

export const useCounterStore = create((set) => ({
    counter: 0,
    loading: false,

    increment: () => set((state) => ({ counter: state.counter + 1 })),
    decrement: () => {
        set((state) => ({ counter: state.counter - 1 }));
        return { success: true, message: "Counter decremented successfully" };
    },

    incrementAsync: () => {
        set({ loading: true });
        new Promise((resolve) => {
            setTimeout(() => {
                set((state) => ({ counter: state.counter + 1, loading: false }));
                resolve();
            }, 1000);
        });
    }
}));
