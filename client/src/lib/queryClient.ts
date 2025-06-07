import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest<T = any>(
  url: string,
  options?: RequestInit,
  skipJsonParse?: boolean
): Promise<T> {
  try {
    // Add retry mechanism for network failures
    let attempts = 0;
    const maxAttempts = 2;
    
    while (attempts < maxAttempts) {
      try {
        // Use proxy configuration from Vite
        const baseUrl = '/api';
        const fullUrl = url.startsWith('/api') ? url : `${baseUrl}${url}`;
        
        const res = await fetch(fullUrl, {
          ...options,
          headers: {
            "Content-Type": "application/json",
            ...(options?.headers || {}),
          },
          // Use 'include' for cross-origin requests with cookies
          credentials: "include",
        });
    
        await throwIfResNotOk(res);
        
        if (skipJsonParse) {
          return res as unknown as T;
        }
        
        const data = await res.json();
        return data;
      } catch (error) {
        attempts++;
        if (attempts >= maxAttempts) throw error;
        
        // Wait before retry (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, 1000 * attempts));
      }
    }
    
    throw new Error("Request failed after multiple attempts");
  } catch (error: any) {
    console.error(`API request failed for ${url}:`, error);
    throw error;
  }
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn = <T = unknown>(options: {
  on401: UnauthorizedBehavior;
}): QueryFunction<T> => 
  async ({ queryKey }) => {
    try {
      // Add retry mechanism for network failures
      let attempts = 0;
      const maxAttempts = 2;
      
      while (attempts < maxAttempts) {
        try {
          // Use proxy configuration from Vite
          const baseUrl = '/api';
          const url = queryKey[0] as string;
          const fullUrl = url.startsWith('/api') ? url : `${baseUrl}${url}`;
          
          const res = await fetch(fullUrl, {
            // Use include for cross-origin requests with cookies
            credentials: "include",
          });
          
          // Check for localStorage auth when receiving 401
          if (res.status === 401) {
            const storedUser = localStorage.getItem('str8_user');
            if (storedUser && options.on401 === "returnNull") {
              console.log("Using localStorage auth as fallback");
              return JSON.parse(storedUser) as T;
            } else if (options.on401 === "returnNull") {
              return null as T;
            }
          }
      
          await throwIfResNotOk(res);
          return await res.json() as T;
        } catch (error) {
          attempts++;
          if (attempts >= maxAttempts) throw error;
          
          // Wait before retry (exponential backoff)
          await new Promise(resolve => setTimeout(resolve, 1000 * attempts));
        }
      }
      
      throw new Error("Query failed after multiple attempts");
    } catch (error: any) {
      console.error(`Query failed for ${queryKey[0]}:`, error);
      throw error;
    }
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      refetchOnMount: true, // Enable this to ensure data is fresh on component mount
      refetchOnReconnect: true, // Enable to refresh data when reconnecting
      staleTime: 5 * 60 * 1000, // Data considered fresh for 5 minutes
      retry: (failureCount, error: any) => {
        // Retry logic: don't retry for 404s or 401s (not found or unauthorized)
        if (error?.status === 404 || error?.status === 401) {
          return false;
        }
        // Retry up to 2 times for other errors
        return failureCount < 2;
      },
      networkMode: 'always',
    },
    mutations: {
      retry: (failureCount, error: any) => {
        // Only retry network-related errors, not server validation errors
        if (error?.status >= 400 && error?.status < 500) {
          return false; // Don't retry client errors (400-499)
        }
        return failureCount < 1; // Retry server errors once
      },
      networkMode: 'always',
    },
  },
});
