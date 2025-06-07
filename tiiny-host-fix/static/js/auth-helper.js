/**
 * Auth Helper - Utility functions for authentication
 * Provides better handling for authentication errors across the application
 */

// Constants - Improved API URL detection
const detectApiBaseUrl = () => {
  // Known API server ports to try in order of preference
  const knownApiPorts = ['8081', '3000', '5000', '8080'];
  
  // Client is on localhost
  if (window.location.hostname.includes('localhost') || window.location.hostname.includes('127.0.0.1')) {
    // If client port is one of the known API ports, assume API is on same port
    if (knownApiPorts.includes(window.location.port)) {
      return `http://${window.location.hostname}:${window.location.port}/api`;
    }
    
    // Otherwise use port 8081 (our known server port)
    return `http://${window.location.hostname}:8081/api`;
  }
  
  // Production or other environment - use relative path
  return '/api';
};

const API_BASE_URL = detectApiBaseUrl();

// For debugging - log API config
console.log('Auth configuration:', { 
  apiBaseUrl: API_BASE_URL,
  clientUrl: window.location.origin,
  clientPort: window.location.port || 'default',
  isLocalhost: window.location.hostname.includes('localhost') || window.location.hostname.includes('127.0.0.1')
});

// Authentication helpers
const AuthHelper = {
  /**
   * Perform login with enhanced error handling
   * @param {Object} credentials - Login credentials
   * @returns {Promise<Object>} - Login response
   */
  async login(credentials) {
    try {
      console.log('Attempting login with API URL:', `${API_BASE_URL}/auth/login`);
      console.log('Login credentials (excluding password):', { ...credentials, password: '***' });
      
      // Add timeout to fetch request
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
      
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(credentials),
        credentials: 'include',
        signal: controller.signal,
        mode: 'cors' // Explicitly set CORS mode
      }).finally(() => clearTimeout(timeoutId));
      
      // First, try to parse the response as JSON
      let errorData = {};
      let responseText = '';
      
      try {
        // Try to get raw response text first for debugging
        responseText = await response.text();
        console.log('Raw API response:', responseText);
        
        // Then parse as JSON if possible
        if (responseText) {
          try {
            const jsonData = JSON.parse(responseText);
            if (!response.ok) {
              errorData = jsonData;
              console.error('Login API error response:', errorData);
            } else {
              return { success: true, data: jsonData };
            }
          } catch (jsonError) {
            console.error('Error parsing JSON:', jsonError);
            errorData = { error: 'Invalid JSON response from server' };
          }
        }
      } catch (parseError) {
        console.error('Error reading API response:', parseError);
        errorData = { error: `Status ${response.status}: ${response.statusText}` };
      }
      
      if (!response.ok) {
        return { 
          success: false, 
          error: (errorData && errorData.error) || `Login failed (${response.status}). Please check your credentials.`,
          details: errorData,
          statusCode: response.status
        };
      }
      
      // This should never execute if the above JSON parsing worked
      return { success: true, data: {} };
    } catch (error) {
      console.error('Login process failed:', error);
      
      // Determine specific error type
      if (error.name === 'AbortError') {
        return {
          success: false,
          error: 'Request timed out. The server may be down or unreachable.',
          details: error
        };
      } else if (error.name === 'TypeError' && error.message.includes('NetworkError')) {
        return {
          success: false,
          error: 'Network error: API server may be down or CORS issue detected.',
          details: error
        };
      }
      
      return { 
        success: false, 
        error: error.message || 'Network error or server unavailable. Please try again later.',
        details: error
      };
    }
  },
  
  /**
   * Perform registration with enhanced error handling
   * @param {Object} userData - User registration data
   * @returns {Promise<Object>} - Registration response
   */
  async register(userData) {
    try {
      console.log('Attempting registration with API URL:', `${API_BASE_URL}/auth/register`);
      console.log('Registration data (excluding password):', { ...userData, password: '***' });
      
      // Add timeout to fetch request
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
      
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(userData),
        credentials: 'include',
        signal: controller.signal,
        mode: 'cors' // Explicitly set CORS mode
      }).finally(() => clearTimeout(timeoutId));
      
      // First, try to get raw response text for debugging
      let responseText = '';
      try {
        responseText = await response.text();
        console.log('Raw registration API response:', responseText);
      } catch (textError) {
        console.error('Error reading raw response:', textError);
      }
      
      // Try to parse as JSON
      let errorData = {};
      let jsonData = {};
      
      if (responseText) {
        try {
          jsonData = JSON.parse(responseText);
          
          if (!response.ok) {
            errorData = jsonData;
            console.error('Registration API error response:', errorData);
          } else {
            return { success: true, data: jsonData };
          }
        } catch (jsonError) {
          console.error('Error parsing JSON:', jsonError);
          errorData = { error: 'Invalid JSON response from server' };
        }
      }
      
      if (!response.ok) {
        return { 
          success: false, 
          error: (errorData && errorData.error) || `Registration failed (${response.status}). Please check your input.`,
          details: errorData,
          statusCode: response.status
        };
      }
      
      // This should never execute if the above JSON parsing worked
      return { success: true, data: jsonData };
    } catch (error) {
      console.error('Registration process failed:', error);
      
      // Determine specific error type
      if (error.name === 'AbortError') {
        return {
          success: false,
          error: 'Request timed out. The server may be down or unreachable.',
          details: error
        };
      } else if (error.name === 'TypeError' && error.message.includes('NetworkError')) {
        return {
          success: false,
          error: 'Network error: API server may be down or CORS issue detected.',
          details: error
        };
      }
      
      return { 
        success: false, 
        error: error.message || 'Network error or server unavailable. Please try again later.',
        details: error
      };
    }
  },
  
  /**
   * Clear all authentication data
   */
  clearAuth() {
    // Clear all localStorage
    localStorage.clear();
    
    // Clear all sessionStorage
    sessionStorage.clear();
    
    // Clear any cookies
    document.cookie.split(";").forEach(function(c) { 
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
    });
    
    // Clear service worker caches
    if ('caches' in window) {
      caches.keys().then(cacheNames => {
        cacheNames.forEach(cacheName => {
          caches.delete(cacheName);
        });
      });
    }
  },
  
  /**
   * Check if user is authenticated
   * @returns {boolean} - True if authenticated
   */
  isAuthenticated() {
    // Check for authentication token in cookies
    return document.cookie.includes('authToken=');
  }
};

// If using as a module
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AuthHelper;
}
