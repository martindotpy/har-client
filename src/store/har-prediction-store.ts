import type { HarType } from "@/api";
import { create } from "zustand";

interface HarPredictionState {
  prediction: HarType | null;
  setPrediction: (prediction: HarType | null) => void;
}

export const useHarPredictionStore = create<HarPredictionState>((set) => ({
  prediction: null,
  setPrediction: (prediction) => set({ prediction }),
}));
