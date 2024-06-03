import { create } from 'zustand';

const useCheckout = create((set) => ({
  active: false,
  set: () => set((state) => ({ active: state })),
}));

export { useCheckout };
