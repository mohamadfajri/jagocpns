import { create } from 'zustand';

const useAlert = create((set) => ({
  alert: {
    color: null,
    title: null,
    message: null,
  },
  setAlert: (value) => {
    set({
      alert: {
        color: value.color,
        title: value.title,
        message: value.message,
      },
    });

    setTimeout(() => {
      set({
        alert: {
          color: null,
          title: null,
          message: null,
        },
      });
    }, 5000);
  },
}));

export { useAlert };
