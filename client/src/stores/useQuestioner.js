import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useQuestioner = create(
  persist(
    (set) => ({
      token: null,
      expired: null,
      setToken: (token) => {
        set({ token, expired: Date.now() + 24 * 60 * 60 * 1000 });
      },
      removeToken: () => set({ token: null, expired: null }),
    }),
    {
      name: 'auth-storage-questioner',
    }
  )
);

export { useQuestioner };
