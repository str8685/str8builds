import { FC, ReactNode, useState, useEffect } from "react";
import { useLocation, Redirect } from "wouter";
import { useAuth } from "@/hooks/useAuth";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const [, navigate] = useLocation();
  const [authError, setAuthError] = useState<string | null>(null);
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  // Enhanced authentication check with error handling and immediate redirect
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // If we're in a redirect state, don't do anything
        if (redirectToLogin) return;

        // If authentication is complete and user is not authenticated, redirect to login
        if (!isLoading && !isAuthenticated) {
          console.log(
            "Protected route: Not authenticated, redirecting to login",
          );
          // Clear any existing auth verification
          sessionStorage.removeItem("authVerifiedAt");
          setRedirectToLogin(true);
          return;
        }

        // Edge case: isAuthenticated is true but user data is missing
        if (!isLoading && isAuthenticated && !user) {
          console.error(
            "Authentication error: User is authenticated but user data is missing",
          );
          // Clear any existing auth verification
          sessionStorage.removeItem("authVerifiedAt");
          setAuthError("Authentication error. Please try logging in again.");
          setRedirectToLogin(true);
          return;
        }

        // If we get here and are authenticated, mark as verified
        if (isAuthenticated) {
          sessionStorage.setItem("authVerifiedAt", Date.now().toString());
        }
      } catch (error) {
        console.error("Error in authentication check:", error);
        // Clear verification and force redirect on error
        sessionStorage.removeItem("authVerifiedAt");
        setAuthError(
          "An unexpected authentication error occurred. Redirecting to login...",
        );
        setRedirectToLogin(true);
      }
    };

    checkAuth();
  }, [isLoading, isAuthenticated, user, navigate, redirectToLogin]);

  // Optimized loading state - much faster and simpler
  if (isLoading) {
    // Check if we've verified auth recently to avoid showing loader unnecessarily
    const recentlyVerified = sessionStorage.getItem("authVerifiedAt");
    const now = Date.now();

    // If authenticated within the last minute, render children immediately to avoid loading flash
    if (recentlyVerified && now - Number(recentlyVerified) < 60000) {
      return <>{children}</>;
    }

    // Use a minimal loading indicator that doesn't cause layout shifts
    return (
      <div className="fixed top-0 left-0 right-0 z-50 h-1" data-oid="zbdrxfh">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 animate-pulse"
          data-oid="pgor7q8"
        ></div>
      </div>
    );
  }

  // Show error message if there is an authentication error
  if (authError) {
    return (
      <div
        className="flex flex-col justify-center items-center min-h-screen bg-space-900/50"
        data-oid="nfprtd5"
      >
        <div
          className="bg-red-900/30 border border-red-700 rounded-lg p-4 max-w-md"
          data-oid="a:h54a4"
        >
          <h3 className="text-red-400 text-lg mb-2" data-oid="le:ps:.">
            Authentication Error
          </h3>
          <p className="text-white mb-4" data-oid="zfdrf3q">
            {authError}
          </p>
          <button
            onClick={() => navigate("/login")}
            className="bg-red-800 hover:bg-red-700 text-white py-2 px-4 rounded-md text-sm"
            data-oid="t36ufks"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (redirectToLogin) {
    return <Redirect to="/login" data-oid="xpie-bj" />;
  }

  // If authenticated and no errors, render children
  return <>{children}</>;
};

export default ProtectedRoute;
