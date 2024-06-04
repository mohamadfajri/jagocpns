import { create } from 'zustand';

const useRank = create((set) => ({
  active: null,
  set: () => set((state) => ({ active: state })),
}));

export { useRank };
