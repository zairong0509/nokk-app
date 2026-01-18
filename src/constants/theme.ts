/**
 * NOKK Design System - Spotify-inspired Modern Theme
 */

export const COLORS = {
  // Primary brand color - Navy
  primary: '#1a2332',
  primaryDark: '#0f1419',
  primaryLight: '#2a3d54',

  // Accent colors - simplified
  accent: '#3d5a80',
  warning: '#e07a5f',
  error: '#d62828',
  success: '#2a9d8f',

  // Premium gold
  premium: '#f4a261',
  premiumDark: '#e76f51',

  // Light theme
  light: {
    background: '#FFFFFF',
    surface: '#F5F5F5',
    card: '#FFFFFF',
    text: '#191414',
    textSecondary: '#535353',
    textTertiary: '#B3B3B3',
    border: '#E0E0E0',
    divider: '#EEEEEE',
  },

  // Dark theme (Spotify-style)
  dark: {
    background: '#121212',
    surface: '#181818',
    card: '#282828',
    text: '#FFFFFF',
    textSecondary: '#B3B3B3',
    textTertiary: '#535353',
    border: '#333333',
    divider: '#404040',
  },

  // Common
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',

  // Category colors - unified navy palette
  categories: {
    delivery: '#2a3d54',
    unknown: '#3d5a80',
    threat: '#4a5f7f',
    night: '#1a2332',
    general: '#2a3d54',
  },
};

export const FONTS = {
  // Font families
  regular: 'Inter-Regular',
  medium: 'Inter-Medium',
  semiBold: 'Inter-SemiBold',
  bold: 'Inter-Bold',

  // Font sizes (increased for better readability)
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    base: 18,
    lg: 20,
    xl: 24,
    '2xl': 28,
    '3xl': 34,
    '4xl': 40,
    '5xl': 52,
  },

  // Line heights
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
  '4xl': 48,
  '5xl': 64,
};

export const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  full: 9999,
};

export const SHADOWS = {
  sm: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 16,
  },
};

export const ANIMATION = {
  fast: 150,
  normal: 300,
  slow: 500,
};

// Quick Action Button specific styles
export const QUICK_ACTION_BUTTON = {
  height: 72,
  borderRadius: BORDER_RADIUS.xl,
  iconSize: 28,
};

// Category Card styles
export const CATEGORY_CARD = {
  height: 56,
  borderRadius: BORDER_RADIUS.lg,
  iconSize: 24,
};

// Phrase Item styles
export const PHRASE_ITEM = {
  height: 64,
  borderRadius: BORDER_RADIUS.md,
};
