import React, { useEffect } from "react";
import { useTutorial } from "./TutorialContext";
import { Button } from "@/components/ui/button";

interface TutorialTriggerProps {
  autoStart?: boolean;
  delay?: number;
  className?: string;
  stepIds?: string[];
  children?: React.ReactNode;
}

const TutorialTrigger: React.FC<TutorialTriggerProps> = ({
  autoStart = false,
  delay = 2000,
  className = "",
  stepIds,
  children,
}) => {
  const { startTutorial, hasSeenTutorial } = useTutorial();

  // Auto-start the tutorial if specified
  useEffect(() => {
    if (autoStart && !hasSeenTutorial) {
      const timer = setTimeout(() => {
        startTutorial(stepIds);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [autoStart, delay, startTutorial, hasSeenTutorial, stepIds]);

  // Start tutorial manually when clicked
  const handleStartTutorial = () => {
    startTutorial(stepIds);
  };

  // If only using auto-start, don't render a button
  if (autoStart && !children) {
    return null;
  }

  // If children are provided, wrap them with onClick
  if (children) {
    return (
      <div
        className={className}
        onClick={handleStartTutorial}
        data-oid=".97kgam"
      >
        {children}
      </div>
    );
  }

  // Default button
  return (
    <Button
      onClick={handleStartTutorial}
      className={`bg-cyan hover:bg-cyan/90 text-space-950 ${className}`}
      variant="outline"
      data-oid="us2r_nw"
    >
      <svg
        className="w-4 h-4 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        data-oid="zokyirt"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          data-oid=".h6b8t6"
        />
      </svg>
      App Tour
    </Button>
  );
};

export default TutorialTrigger;
