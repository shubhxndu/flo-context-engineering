import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { WORKSHOP_CONFIG } from '@/config/constants';

/**
 * Utility function to combine Tailwind CSS classes.
 *
 * Merges class names using clsx and tailwind-merge to handle
 * conflicting Tailwind classes intelligently.
 *
 * @param inputs - Class values to combine
 * @returns Merged class string
 */
export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs));
};

/**
 * Validates workshop code format.
 *
 * Ensures the workshop code matches the expected pattern:
 * 4 alphanumeric characters (uppercase).
 *
 * @param code - Workshop code to validate
 * @returns True if valid, false otherwise
 */
export const isValidWorkshopCode = (code: string): boolean => {
  return WORKSHOP_CONFIG.CODE_REGEX.test(code.toUpperCase());
};

/**
 * Generates a random workshop code.
 *
 * Creates a 4-character alphanumeric code for workshop identification.
 *
 * @returns Random workshop code
 */
export const generateWorkshopCode = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < WORKSHOP_CONFIG.CODE_LENGTH; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * Formats a timestamp to a readable date string.
 *
 * @param timestamp - ISO timestamp string
 * @returns Formatted date string
 */
export const formatTimestamp = (timestamp: string): string => {
  return new Date(timestamp).toLocaleString();
};

/**
 * Debounce function for limiting function calls.
 *
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};