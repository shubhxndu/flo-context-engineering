/**
 * Application constants for the Workshop Companion App.
 *
 * Centralizes configuration values and magic numbers used
 * throughout the application for better maintainability.
 */

export const APP_CONFIG = {
  NAME: 'Workshop Companion',
  DESCRIPTION: 'Interactive workshop platform for engaging learning experiences',
  VERSION: '1.0.0',
} as const;

export const WORKSHOP_CONFIG = {
  CODE_LENGTH: 4,
  CODE_REGEX: /^[A-Z0-9]{4}$/,
  MAX_PARTICIPANTS: 50,
  POLLING_INTERVAL: 3000, // 3 seconds
  SESSION_TIMEOUT: 24 * 60 * 60 * 1000, // 24 hours in ms
} as const;

export const API_CONFIG = {
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
} as const;

export const UI_CONFIG = {
  TOAST_DURATION: 5000, // 5 seconds
  ANIMATION_DURATION: 200, // 200ms
  DEBOUNCE_DELAY: 300, // 300ms
} as const;

export const ROUTES = {
  HOME: '/',
  ORGANIZER_LOGIN: '/o/login',
  ORGANIZER_DASHBOARD: '/o/dashboard',
  WORKSHOP_SESSION: (code: string): string => `/s/${code}`,
} as const;