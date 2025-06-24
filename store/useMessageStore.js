// store/useMessageStore.js
import { create } from 'zustand';

const useMessageStore = create((set) => ({
  message: null, // null ya { type: 'success' | 'error', text: '...' }

  // ✅ Set message
  setMessage: (type, text) => set({ message: { type, text } }),

  // ✅ Clear message
  clearMessage: () => set({ message: null }),
}));

export default useMessageStore;
