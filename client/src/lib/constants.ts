// App Information
export const APP_NAME = 'STR8 BUILD';
export const APP_VERSION = '3.4';
export const APP_OWNER = 'C.SAMU';

// Job-related constants
export const DEFAULT_HOURLY_RATE = 65.00;
export const GST_RATE = 0.15; // 15% GST in New Zealand

// UI Theme Colors
export const COLORS = {
  // Background colors
  spaceBlue900: '#0f172a',
  spaceBlue800: '#1e293b',
  spaceBlue700: '#121a2e',
  
  spacePurple900: '#2d1b69',
  spacePurple800: '#331e78',
  
  // Accent colors
  electricBlue: '#00b4ff',
  vibrantCyan: '#06f7f7',
  energyTeal: '#02e2b9',
  
  // Standard colors
  white: '#ffffff',
  black: '#000000',
  gray100: '#f3f4f6',
  gray200: '#e5e7eb',
  gray300: '#d1d5db',
  gray400: '#9ca3af',
  gray500: '#6b7280',
  gray600: '#4b5563',
  gray700: '#374151',
  gray800: '#1f2937',
  gray900: '#111827',
  
  // Alert colors
  warning: '#f59e0b',
  danger: '#ef4444',
  success: '#10b981',
};

// NZ-specific data
export const NZ_REGIONS = [
  'Auckland',
  'Bay of Plenty',
  'Canterbury',
  'Gisborne',
  'Hawke\'s Bay',
  'Manawatu-Wanganui',
  'Marlborough',
  'Nelson',
  'Northland',
  'Otago',
  'Southland',
  'Taranaki',
  'Tasman',
  'Waikato',
  'Wellington',
  'West Coast'
];

// Mobile Tools
export const MOBILE_TOOLS = [
  { id: 'measure', name: 'Measure', icon: 'fas fa-ruler', color: 'electric' },
  { id: 'level', name: 'Level', icon: 'fas fa-level-up-alt fa-rotate-90', color: 'cyan' },
  { id: 'angle', name: 'Angle', icon: 'fas fa-compass', color: 'teal' },
  { id: 'calculator', name: 'Calculator', icon: 'fas fa-calculator', color: 'electric' },
  { id: 'camera', name: 'Project Cam', icon: 'fas fa-camera', color: 'cyan' },
  { id: 'sound', name: 'Sound Meter', icon: 'fas fa-volume-up', color: 'teal' },
  { id: 'notes', name: 'Site Notes', icon: 'fas fa-clipboard', color: 'electric' },
];

// Building Resources Categories
export const RESOURCE_CATEGORIES = [
  { id: 'stairs', name: 'Stairs', icon: 'fas fa-stairs' },
  { id: 'floors', name: 'Floors', icon: 'fas fa-th' },
  { id: 'gib', name: 'GIB®', icon: 'fas fa-square' },
  { id: 'geometry', name: 'Geometry', icon: 'fas fa-drafting-compass' },
  { id: 'materials', name: 'Materials', icon: 'fas fa-cubes' },
  { id: 'tools', name: 'Tools', icon: 'fas fa-tools' },
];
