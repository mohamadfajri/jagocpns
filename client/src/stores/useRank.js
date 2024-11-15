import { create } from "zustand";

const useRank = create((set) => ({
  active: null,
  page: 1,
  limit: 10,
  totalPages: 1,
  setTotalPage: (value) => set({ totalPages: value }),
  setPage: (value) => set({ page: value }),
  setActive: (value) => set({ active: value }),
  setLimit: (limit) => set({ limit }),
}));

export { useRank };
