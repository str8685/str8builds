/// <reference types="vite/client" />

interface ImportMeta {
  env: {
    PROD: boolean;
    DEV: boolean;
    MODE: string;
    BASE_URL: string;
    VITE_ENABLE_ANALYTICS?: string;
    // Add other env variables as needed
  };
}
