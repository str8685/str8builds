import React from "react";

// Simple passthrough component - no tutorial functionality
interface TutorialProps {
  children: React.ReactNode;
  autoStart?: boolean;
  delay?: number;
}

const Tutorial: React.FC<TutorialProps> = ({ children }) => {
  return <>{children}</>; // Just render children with no tutorial
};

export default Tutorial;
