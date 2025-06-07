import React, { createContext, useContext } from "react";

// Simplified tutorial step type (only keeping the necessary for type compatibility)
export interface TutorialStep {
  id: string;
  title: string;
  description: string;
  targetElement?: string;
  position?: "top" | "right" | "bottom" | "left" | "center";
  animationKey?: string;
}

// Empty tutorial steps object
export const TUTORIAL_STEPS: { [key: string]: TutorialStep } = {};

// Tutorial context interface (same as before for compatibility)
interface TutorialContextType {
  isActive: boolean;
  currentStep: number;
  steps: TutorialStep[];
  hasSeenTutorial: boolean;
  startTutorial: (stepIds?: string[]) => void;
  skipTutorial: () => void;
  nextStep: () => void;
  prevStep: () => void;
  setHasSeenTutorial: (value: boolean) => void;
}

// Create the context with simplified default values
const defaultValue: TutorialContextType = {
  isActive: false,
  currentStep: 0,
  steps: [],
  hasSeenTutorial: true, // Always true to skip all tutorials
  startTutorial: () => {}, // No-op function
  skipTutorial: () => {}, // No-op function
  nextStep: () => {}, // No-op function
  prevStep: () => {}, // No-op function
  setHasSeenTutorial: () => {}, // No-op function
};

const TutorialContext = createContext<TutorialContextType>(defaultValue);

// Simplified provider component that just passes through children
interface TutorialProviderProps {
  children: React.ReactNode;
}

export const TutorialProvider: React.FC<TutorialProviderProps> = ({
  children,
}) => {
  // Always use default values that disable tutorials
  return (
    <TutorialContext.Provider value={defaultValue} data-oid="z-.-28u">
      {children}
    </TutorialContext.Provider>
  );
};

// Simplified hook that just returns the default values
export const useTutorial = () => {
  return useContext(TutorialContext);
};
