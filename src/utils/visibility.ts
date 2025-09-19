import { useState, useEffect } from 'react';

/**
 * Hook for detecting document visibility changes.
 *
 * Provides real-time visibility state to control polling and other
 * resource-intensive operations based on tab visibility.
 *
 * @returns Current visibility state (true if visible, false if hidden)
 */
export const useDocumentVisibility = (): boolean => {
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof document !== 'undefined') {
      return !document.hidden;
    }
    return true; // Default to visible during SSR
  });

  useEffect(() => {
    const handleVisibilityChange = (): void => {
      setIsVisible(!document.hidden);
    };

    // Add event listener for visibility changes
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup event listener on unmount
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return isVisible;
};

/**
 * Hook for controlling polling based on document visibility.
 *
 * Automatically pauses polling when the tab is not visible to conserve
 * resources and reduce unnecessary API calls.
 *
 * @param baseInterval - Base polling interval in milliseconds
 * @returns Current polling interval (0 when paused, baseInterval when active)
 */
export const useVisibilityControlledPolling = (baseInterval: number): number => {
  const isVisible = useDocumentVisibility();
  return isVisible ? baseInterval : 0;
};