import React, { useEffect } from "react";

// Simplify to a minimal component that just calls onComplete immediately
interface AnimatedWelcomeTutorialProps {
  onComplete: () => void;
  autoStart?: boolean;
  delay?: number;
}

const AnimatedWelcomeTutorial: React.FC<AnimatedWelcomeTutorialProps> = ({
  onComplete,
  delay = 0,
}) => {
  // Always immediately complete
  useEffect(() => {
    const timer = setTimeout(() => {
      // Mark all tutorial completions in localStorage
      localStorage.setItem("str8build_tutorial_completed", "true");
      localStorage.setItem("str8build_welcome_completed", "true");

      // Complete immediately
      onComplete();
    }, delay);

    return () => clearTimeout(timer);
  }, [onComplete, delay]);

  // Render nothing - component just triggers onComplete
  return null;
};

export default AnimatedWelcomeTutorial;
