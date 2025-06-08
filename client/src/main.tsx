import { createRoot } from "react-dom/client";
import { StrictMode, useEffect } from "react";
import { Router, useLocation } from "wouter";
import App from "./App";
import "./index.css";
// Import responsive styles for mobile and tablet support
import "./styles/responsive.css";
// Import the Jobs navigation fix
import "./jobsNavFix.js";
// Import Error Boundary and Analytics
import ErrorBoundary from "./components/ErrorBoundary";
import analytics from "./utils/analytics";

// Main app wrapper with route tracking
const AppWithTracking = () => {
  // Get current location from wouter
  const [location] = useLocation();

  // Track page views when location changes
  useEffect(() => {
    if (import.meta.env.PROD) {
      analytics.trackPageView(location);
    }
  }, [location]);

  return <App data-oid="czi_cqo" />;
};

createRoot(document.getElementById("root")!).render(
  <StrictMode data-oid="4fo6t4p">
    <ErrorBoundary data-oid="uvf6izd">
      <Router data-oid="bj37hal">
        <AppWithTracking data-oid="dgrx.c:" />
      </Router>
    </ErrorBoundary>
  </StrictMode>,
);
