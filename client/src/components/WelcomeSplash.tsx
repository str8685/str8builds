import { FC, useEffect } from "react";

interface WelcomeSplashProps {
  onComplete: () => void;
}

// Simplified WelcomeSplash that just calls onComplete immediately
const WelcomeSplash: FC<WelcomeSplashProps> = ({ onComplete }) => {
  useEffect(() => {
    // Just execute onComplete immediately
    onComplete();

    // Mark as visited in sessionStorage
    sessionStorage.setItem("hasVisitedSTR8BUILD", "true");
  }, [onComplete]);

  // Render nothing - no splash screen
  return null;
};

export default WelcomeSplash;
