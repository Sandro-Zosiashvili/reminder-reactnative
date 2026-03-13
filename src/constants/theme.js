/**
 * SubSense Theme Constants
 * Dark, minimalist design system inspired by Apple-style premium aesthetics.
 */

export const COLORS = {
  /** Primary background — true black for OLED-friendly dark mode */
  background: '#000000',

  /** Card/surface background — subtle slate gray for depth */
  card: '#1A1A1B',

  /** Deep crimson red — used sparingly for alerts, warnings, and destructive actions */
  accent: '#E63946',

  /** Primary text — pure white for maximum contrast on dark backgrounds */
  textPrimary: '#FFFFFF',

  /** Secondary text — muted off-white for less prominent information */
  textSecondary: '#A0A0A0',

  /** Tertiary text — dim gray for hints and placeholders */
  textTertiary: '#6B6B6B',

  /** Subtle border color for card edges */
  border: '#2A2A2B',

  /** Success/positive indicators */
  success: '#4CAF50',

  /** Warning indicators */
  warning: '#FF9800',

  /** Skeleton shimmer base and highlight */
  skeletonBase: '#1A1A1B',
  skeletonHighlight: '#2A2A2B',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const FONT_SIZE = {
  caption: 12,
  body: 14,
  subtitle: 16,
  title: 20,
  heading: 28,
  hero: 36,
};

export const BORDER_RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  round: 9999,
};
