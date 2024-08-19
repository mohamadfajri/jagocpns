import { create } from 'zustand';

const useTopup = create((set) => ({
  isCheckout: false,
  data: null,
  method: null,
  setMethodState: (newMethod) => set(() => ({ method: newMethod })),
  setData: (newData) => set(() => ({ data: newData })),
  set: (isCheckout) => set(() => ({ isCheckout })),
}));

export { useTopup };
