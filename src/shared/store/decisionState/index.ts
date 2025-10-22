import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ActiveDecisionState {
  activeDecision: number;
  setActiveDecision: (index: number) => void;
}

export const useActiveIndexStore = create<ActiveDecisionState>()(
  persist(
    (set) => ({
      activeDecision: 0,
      setActiveDecision: (index) => set({ activeDecision: index }),
    }),
    {
      name: "active-index-storage",
    }
  )
);
