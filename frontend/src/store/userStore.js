import { create } from "zustand";
import { persist } from "zustand/middleware";

const userStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user-store", // key in localStorage
      partialize: (state) => ({ user: state.user }), // only persist 'user'
    },
  ),
);

export default userStore;
