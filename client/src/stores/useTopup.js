import { create } from 'zustand';

const useTopup = create((set) => ({
  isCheckout: false,
  set: () => set((state) => ({ isCheckout: state })),
}));

export { useTopup };
