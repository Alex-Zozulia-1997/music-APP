import { create } from 'zustand';

interface InputStore {
  foucsedInput: boolean;
  actions: {
    setFoucsedInput: (isFocused: boolean) => void;
  };
}

export const useInputStore = create<InputStore>((set) => ({
  foucsedInput: false,
  actions: {
    setFoucsedInput: (isFocused) => set({ foucsedInput: isFocused }),
  },
}));
