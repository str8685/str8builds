import React from "react";
import { useTutorial } from "./TutorialContext";
import TutorialStep from "./TutorialStep";
import { createPortal } from "react-dom";

const TutorialModal: React.FC = () => {
  const { isActive, currentStep, steps, nextStep, prevStep, skipTutorial } =
    useTutorial();

  // Don't render anything if the tutorial is not active
  if (!isActive || steps.length === 0) {
    return null;
  }

  // Get the current step
  const step = steps[currentStep];
  const isFirst = currentStep === 0;
  const isLast = currentStep === steps.length - 1;

  // Render the tutorial step using a portal to prevent positioning issues
  return createPortal(
    <TutorialStep
      step={step}
      onNext={nextStep}
      onPrev={prevStep}
      onSkip={skipTutorial}
      isFirst={isFirst}
      isLast={isLast}
      currentStepIndex={currentStep}
      totalSteps={steps.length}
      data-oid="88-.7du"
    />,

    document.body,
  );
};

export default TutorialModal;
