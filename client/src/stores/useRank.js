import { create } from 'zustand';

const useRank = create((set) => ({
  active: null,
  page: 1,
  totalPages: 1,
  setTotalPage: (value) => set({ totalPages: value }),
  setPage: (value) => set({ page: value }),
  setActive: (value) => set({ active: value }),
}));

export { useRank };
