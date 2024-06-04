import { create } from 'zustand';

const useTopup = create((set) => ({
  active: 'topup',
  set: () => set((state) => ({ active: state })),
}));

export { useTopup };
