/**
 * API client configuration
 * Handles API requests with proper error handling and authentication
 */

// Base URL for API requests - use proxy route instead of direct server access
const API_BASE_URL = '/api';

/**
 * Make API request with proper error handling
 * @param endpoint - API endpoint
 * @param options - Fetch options
 * @returns Promise with response data
 */
export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  try {
    // Log the request for debugging
    console.log(`API Request: ${endpoint}`, { method: options.method || 'GET' });
    
    // Ensure proper content type for JSON requests
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options.headers,
    };
    
    // Add credentials to include cookies
    const requestOptions: RequestInit = {
      ...options,
      headers,
      credentials: 'include',
    };

    // Make the request
    const response = await fetch(`${API_BASE_URL}${endpoint}`, requestOptions);

    // Handle non-2xx responses
    if (!response.ok) {
      // Detailed error logging for non-OK responses
      const contentType = response.headers.get('content-type');
      let errorData: { message?: string; rawResponse?: string; parseError?: string; [key: string]: any } = {};
      
      try {
        if (contentType && contentType.includes('application/json')) {
          errorData = await response.json();
        } else {
          const textResponse = await response.text();
          errorData = { rawResponse: textResponse };
        }
      } catch (parseError) {
        console.warn('Failed to parse error response:', parseError);
        errorData = { parseError: 'Failed to parse response' };
      }
      
      // Create detailed error object
      const detailedError: any = new Error(errorData.message || `API error: ${response.status}`);
      detailedError.status = response.status;
      detailedError.statusText = response.statusText;
      detailedError.endpoint = endpoint;
      detailedError.errorData = errorData;
      
      // Log the detailed error
      console.error('API response error:', {
        endpoint,
        status: response.status,
        statusText: response.statusText,
        errorData
      });
      
      throw detailedError;
    }

    // Return response data if exists
    if (response.status !== 204) {
      const data = await response.json();
      console.log(`API Success: ${endpoint}`, { status: response.status });
      return data;
    }

    console.log(`API Success (no content): ${endpoint}`);
    return null;
  } catch (error) {
    // Enhanced error logging
    const errorDetails = {
      endpoint,
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : undefined,
      ...((error as any)?.errorData || {})
    };
    
    console.error('API request failed:', errorDetails);
    
    // If this is a network error (like CORS or connection issues), add more context
    if (error instanceof TypeError && error.message.includes('fetch')) {
      console.error('Possible network/CORS issue. Check server connectivity and CORS configuration.');
    }
    
    throw error;
  }
}

/**
 * Client API functions
 */
export const api = {
  // Projects
  projects: {
    getAll: () => apiRequest('/projects'),
    create: (data: any) => apiRequest('/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    update: (id: number, data: any) => apiRequest(`/projects/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
    delete: (id: number) => apiRequest(`/projects/${id}`, {
      method: 'DELETE',
    }),
  },
  
  // Clients
  clients: {
    getAll: () => apiRequest('/clients'),
    create: (data: any) => apiRequest('/clients', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  },
  
  // Time entries
  timeEntries: {
    getAll: () => apiRequest('/time-entries'),
    create: (data: any) => apiRequest('/time-entries', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  },
  
  // Invoices
  invoices: {
    getAll: () => apiRequest('/invoices'),
    create: (data: any) => apiRequest('/invoices', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  },
  
  // Users
  users: {
    getAll: () => apiRequest('/users'),
    getById: (id: number | string) => apiRequest(`/users/${id}`),
    create: (data: any) => apiRequest('/users', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    update: (id: number | string, data: any) => apiRequest(`/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
    delete: (id: number | string) => apiRequest(`/users/${id}`, {
      method: 'DELETE',
    }),
    count: () => apiRequest('/users/count'),
    stats: () => apiRequest('/users/stats'),
  },
  
  // Admin
  admin: {
    dashboard: () => apiRequest('/admin/dashboard'),
    systemStats: () => apiRequest('/admin/system-stats'),
    activityLog: () => apiRequest('/admin/activity-log'),
  }
};
