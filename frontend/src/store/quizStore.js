import { create } from "zustand";

const quizStore = create((set) => ({
  quiz: [],
  isLatest: false,
  latestQuiz: null,

  setLatestFalse: () => set({ isLatest: false }),
  addQuiz: (quiz) =>
    set((state) => ({ quiz: [...state.quiz, quiz], latestQuiz: quiz })),
  setQuiz: (newQuiz) => set({ quiz: newQuiz, isLatest: true }),
}));

export default quizStore;
