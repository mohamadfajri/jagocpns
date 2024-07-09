import { create } from 'zustand';

const useFullscreen = create((set) => ({
  isFullScreen: false,
  setFullScreen: () => set((state) => ({ isFullScreen: state })),
}));

export { useFullscreen };
