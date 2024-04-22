import { create } from "zustand";

type CounterStore = {
  username: string;
  email: string;
  addUser: (username: string, email: string) => void;
  removeUser: () => void;
};

export const useUserStore = create<CounterStore>((set) => ({
  username: "",
  email: "",
  removeUser: () => set(() => ({ username: "", email: "" })),
  addUser: (username, email) => set(() => ({ username, email })),
}));
