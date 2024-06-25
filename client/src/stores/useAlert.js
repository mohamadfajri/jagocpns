import { create } from 'zustand';

const useAlert = create((set) => ({
  status: false,
  alert: {
    color: '',
    title: '',
    message: '',
  },
  setAlert: (value) =>
    set({
      alert: { color: value.color, title: value.title, message: value.message },
    }),
  setStatus: (value) => {
    set({ status: value });
    if (value === true) {
      setTimeout(() => {
        set({ status: false });
      }, 5000);
    }
  },
}));

export { useAlert };
