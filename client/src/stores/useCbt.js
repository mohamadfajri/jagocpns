import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCbt = create(
  persist(
    (set) => ({
      isWorking: null,
      answers: [],
      initialTime: null,
      setAnswers: (answers) => set({ answers }),
      setIsWorking: (s) => set({ isWorking: s }),
      setInitialTime: (time) => set({ initialTime: time }),
    }),
    {
      name: 'cbt-storage',
    }
  )
);

export { useCbt };
