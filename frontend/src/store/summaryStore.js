import { create } from "zustand";

const summaryStore = create((set) => ({
  summary: [],
  isLatest: false,
  latestSummary: null,

  setLatestFalse: () => set({ isLatest: false }),
  addSummary: (summary) =>
    set((state) => ({
      summary: [...state.summary, summary],
      latestSummary: summary,
    })),
  setSummary: (newSummary) => set({ summary: newSummary, isLatest: true }),
}));

export default summaryStore;
