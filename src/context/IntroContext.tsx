"use client";

import { createContext, useContext } from "react";

export type IntroState = "active" | "exiting" | "completed";

export interface IntroContextValue {
  introState: IntroState;
  isIntroActive: boolean;
}

export const IntroContext = createContext<IntroContextValue>({
  introState: "completed",
  isIntroActive: false,
});

export const useIntro = () => useContext(IntroContext);
