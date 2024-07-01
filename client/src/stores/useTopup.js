import { create } from 'zustand';

const useTopup = create((set) => ({
  isCheckout: false,
  data: null,
  setData: (newData) => set(() => ({ data: newData })),
  set: (isCheckout) => set(() => ({ isCheckout })),
}));

export { useTopup };
