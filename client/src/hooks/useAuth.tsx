import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest, getQueryFn } from "@/lib/queryClient";

interface User {
  id: number;
  username: string;
  email?: string;
  profileImageUrl?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  fullName?: string | null;
  companyName?: string | null;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string,
  ) => Promise<void>;
  logout: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const [isInitialLoad, setIsInitialLoad] = useState(false);

  // Pre-load user before component mounts (synchronous)
  let initialUser: User | null = null;
  try {
    const storedUser = localStorage.getItem("str8_user");
    if (storedUser) {
      initialUser = JSON.parse(storedUser);
      console.log("Found existing user in localStorage:", initialUser);
    } else {
      console.log("No existing user in localStorage");
    }
  } catch (e) {
    console.error("Error accessing localStorage:", e);
  }

  // Use pre-loaded user for initial state
  const [localUser, setLocalUser] = useState<User | null>(initialUser);
  const [sessionVerified, setSessionVerified] = useState<boolean>(false);

  // For compatibility with the rest of the app
  const data = localUser;
  const isLoading = false;

  // Simplified refetch function
  const refetch = () => {
    try {
      const storedUser = localStorage.getItem("str8_user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        console.log("User data found in localStorage:", parsedUser);
        setLocalUser(parsedUser);
      } else {
        console.log("No user found in localStorage");
        setLocalUser(null);
      }
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
      setLocalUser(null);
    }
  };

  // Ensure we always have a User | null value, never undefined
  const user: User | null = data ?? null;

  // Login mutation - clean API-only authentication
  const loginMutation = useMutation({
    mutationFn: async (credentials: { username: string; password: string }) => {
      console.log("Sending login request with credentials:", credentials);
      try {
        // Check if username is actually an email (contains @)
        const requestBody = credentials.username.includes("@")
          ? { email: credentials.username, password: credentials.password }
          : credentials;

        console.log("Modified login request body:", requestBody);

        const result = await apiRequest("/api/auth/login", {
          method: "POST",
          body: JSON.stringify(requestBody),
        });
        console.log("Login API response:", result);

        // Store user in localStorage
        if (result && result.user) {
          localStorage.setItem("str8_user", JSON.stringify(result.user));
          setLocalUser(result.user);
        }

        return result;
      } catch (error) {
        console.error("Login API error:", error);
        throw error;
      }
    },
    onSuccess: (data) => {
      // Refetch user data after successful login
      console.log("Login success, user data:", data);
      refetch();
    },
    onError: (error) => {
      console.error("Login mutation error:", error);
    },
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: async (userData: {
      username: string;
      email: string;
      password: string;
    }) => {
      return apiRequest("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(userData),
      });
    },
    onSuccess: () => {
      // No auto-login after registration - we require the user to login themselves
    },
  });

  // Optimized logout mutation for faster performance
  const logoutMutation = useMutation({
    mutationFn: async () => {
      // Clear localStorage first for immediate user feedback
      localStorage.removeItem("str8_user");
      setLocalUser(null);

      // Clear user data from the cache immediately
      queryClient.setQueryData(["/api/auth/user"], null);

      // Then proceed with the API call
      try {
        const result = await apiRequest("/api/auth/logout", {
          method: "POST",
        });
        return result;
      } catch (error) {
        console.error("Logout API error:", error);
        return { success: true };
      }
    },
    // Simplified onSuccess since we already do most actions in mutationFn
    onSuccess: () => {
      // Nothing needed here as we've already handled everything
    },
  });

  // Verify session on application startup
  useEffect(() => {
    const verifySession = async () => {
      if (localUser && !sessionVerified) {
        try {
          // Check with server if session is still valid
          const response = await apiRequest("/api/auth/status", {
            method: "GET",
            credentials: "include", // Important for cookies
          });

          if (response && response.authenticated) {
            // Session is valid, refresh user data
            try {
              const userData = await apiRequest("/api/auth/user", {
                method: "GET",
                credentials: "include",
              });

              if (userData) {
                // Update localStorage with fresh user data
                localStorage.setItem("str8_user", JSON.stringify(userData));
                setLocalUser(userData);
              }
            } catch (error) {
              console.error("Error refreshing user data:", error);
            }

            console.log("Session verified successfully");
          } else {
            // Invalid session but we have local user data - refresh needed
            console.log("Session expired or invalid, attempting refresh...");
            // Try to refresh the session silently
            try {
              // Get token from cookie via document.cookie if available in browser
              const hasCookie = document.cookie.includes("authToken");
              if (hasCookie) {
                // Verify the token with server
                const refreshResponse = await apiRequest("/api/auth/user", {
                  method: "GET",
                  credentials: "include",
                });

                if (refreshResponse) {
                  // Successfully refreshed
                  localStorage.setItem(
                    "str8_user",
                    JSON.stringify(refreshResponse),
                  );
                  setLocalUser(refreshResponse);
                  console.log("Session refreshed successfully");
                } else {
                  // Failed to refresh - clear local data
                  localStorage.removeItem("str8_user");
                  setLocalUser(null);
                  console.log("Failed to refresh session, user logged out");
                }
              } else {
                // No cookie found
                localStorage.removeItem("str8_user");
                setLocalUser(null);
                console.log("No auth cookie found, user logged out");
              }
            } catch (error) {
              console.error("Error refreshing session:", error);
              // Clear local storage on error
              localStorage.removeItem("str8_user");
              setLocalUser(null);
            }
          }
        } catch (error) {
          console.error("Error verifying session:", error);
        } finally {
          setSessionVerified(true);
          setIsInitialLoad(false);
        }
      } else {
        // No local user, just mark as verified
        setSessionVerified(true);
        setIsInitialLoad(false);
      }
    };

    // Only run verification if we have a user and haven't verified yet
    if (!sessionVerified) {
      verifySession();
    }
  }, [localUser, sessionVerified]);

  // Optimized authentication tracking
  useEffect(() => {
    if (!isLoading) {
      // Mark initial load complete
      setIsInitialLoad(false);

      // If user is authenticated, save a timestamp to avoid redundant auth checks
      if (user) {
        sessionStorage.setItem("authVerifiedAt", Date.now().toString());
      }
    }
  }, [isLoading, user]);

  // Login function - clean API-only authentication
  const login = async (username: string, password: string) => {
    // Ensure username is trimmed to prevent whitespace issues
    const trimmedUsername = username.trim();

    // Standard API login only
    await loginMutation.mutateAsync({ username: trimmedUsername, password });

    // Mark session as verified after successful login
    setSessionVerified(true);
  };

  // Register function
  const register = async (
    username: string,
    email: string,
    password: string,
  ) => {
    // Ensure username is trimmed
    const trimmedUsername = username.trim();
    await registerMutation.mutateAsync({
      username: trimmedUsername,
      email: email.trim(),
      password,
    });
  };

  // Logout function with complete cleanup
  const logout = async () => {
    try {
      // Clear all storage that might contain auth data
      localStorage.clear();
      sessionStorage.clear();

      // Clear all React Query data
      queryClient.clear();

      // Reset local state
      setLocalUser(null);
      setSessionVerified(false);

      // Invalidate session on the server (fire and forget)
      try {
        await apiRequest("/api/auth/logout", {
          method: "POST",
          credentials: "include", // Important for cookies
        });
      } catch (error) {
        console.error("Logout API error:", error);
        // Continue with client-side cleanup even if API call fails
      }

      // Clear any service worker caches
      if ("caches" in window) {
        caches.keys().then((cacheNames) => {
          cacheNames.forEach((cacheName) => {
            caches.delete(cacheName);
          });
        });
      }

      // Force a full page reload to ensure all state is reset
      window.location.href = "/login";

      // Small delay to ensure the redirect happens
      await new Promise((resolve) => setTimeout(resolve, 100));

      return true;
    } catch (error) {
      console.error("Logout error:", error);
      // Last resort - clear everything and redirect
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/login";
      return false;
    }
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading: isLoading || isInitialLoad,
        isAuthenticated,
        login,
        register,
        logout,
      }}
      data-oid="2h4.kvb"
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
