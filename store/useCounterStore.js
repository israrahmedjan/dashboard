import { create } from 'zustand';

const useCounterStore = create((set) => ({
  count: 2,
  
  increase: (v) => set((state) => ({ count: state.count + 10 })),
  decrease: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 })
}));

export default useCounterStore;
