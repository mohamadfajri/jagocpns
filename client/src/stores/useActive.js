import { create } from 'zustand';

const useActive = create((set) => ({
  active: 'home',
  set: () => set((state) => ({ active: state })),
}));

export { useActive };
