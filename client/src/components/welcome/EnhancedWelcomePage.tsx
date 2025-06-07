import React, { useEffect } from "react";

// Simplified welcome page that just calls onStart immediately
interface EnhancedWelcomePageProps {
  onStart: () => void;
  onSkip: () => void;
}

const EnhancedWelcomePage: React.FC<EnhancedWelcomePageProps> = ({
  onStart,
}) => {
  // Simply call onStart immediately
  useEffect(() => {
    // Mark all welcome screens as completed in localStorage
    localStorage.setItem("str8build_welcome_completed", "true");

    // Call onStart immediately
    onStart();
  }, [onStart]);

  // Render nothing - component just triggers onStart
  return null;
};

export default EnhancedWelcomePage;
