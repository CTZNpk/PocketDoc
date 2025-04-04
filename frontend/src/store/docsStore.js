import { create } from "zustand";

const docsStore = create((set) => ({
  docs: [],
  isLatest: false,

  addDoc: (doc) => set((state) => ({ docs: [...state.docs, doc] })),
  setDocs: (newDocs) => set({ docs: newDocs, isLatest: true }),
}));

export default docsStore;
