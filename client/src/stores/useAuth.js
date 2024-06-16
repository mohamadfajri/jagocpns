import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuth = create(
  persist(
    (set) => ({
      token: null,
      profile: null,
      expired: null,
      setToken: (token) => {
        set({ token, expired: Date.now() + 24 * 60 * 60 * 1000 });
      },
      setProfile: (data) => {
        set(data);
      },
      removeToken: () => set({ token: null, expired: null, profile: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);

export default useAuth;
