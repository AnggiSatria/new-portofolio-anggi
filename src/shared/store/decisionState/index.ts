import { create } from "zustand";

interface ActiveDecisionState {
  activeDecision: number;
  setActiveDecision: (index: number) => void;
}

export const useActiveIndexStore = create<ActiveDecisionState>((set) => ({
  activeDecision: 0,
  setActiveDecision: (index) => set({ activeDecision: index }),
}));
