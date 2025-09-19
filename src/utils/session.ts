import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';
import { WORKSHOP_CONFIG } from '@/config/constants';

/**
 * Participant session data structure.
 */
export interface ParticipantSession {
  id: string;
  workshopCode: string;
  name: string;
  email?: string | undefined;
  joinedAt: string;
}

/**
 * Hook for managing participant session persistence.
 *
 * Provides cookie-based session management for workshop participants
 * to maintain state across page refreshes and browser sessions.
 *
 * @param workshopCode - Workshop code for session identification
 */
export const useParticipantSession = (workshopCode: string) => {
  const sessionKey = `workshop_${workshopCode}`;

  /**
   * Retrieves the current participant session.
   *
   * @returns Participant session data or null if not found
   */
  const getSession = (): ParticipantSession | null => {
    try {
      const sessionData = Cookies.get(sessionKey);
      return sessionData ? JSON.parse(sessionData) : null;
    } catch (error) {
      console.error('Failed to parse session data:', error);
      return null;
    }
  };

  /**
   * Creates and stores a new participant session.
   *
   * @param name - Participant name
   * @param email - Optional participant email
   * @returns Created session data
   */
  const setSession = (name: string, email?: string): ParticipantSession => {
    const session: ParticipantSession = {
      id: uuidv4(),
      workshopCode,
      name,
      email: email || undefined,
      joinedAt: new Date().toISOString(),
    };

    Cookies.set(sessionKey, JSON.stringify(session), {
      expires: WORKSHOP_CONFIG.SESSION_TIMEOUT / (1000 * 60 * 60 * 24), // Convert to days
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });

    return session;
  };

  /**
   * Removes the participant session.
   */
  const clearSession = (): void => {
    Cookies.remove(sessionKey);
  };

  /**
   * Updates session data while preserving other fields.
   *
   * @param updates - Partial session data to update
   * @returns Updated session data or null if session doesn't exist
   */
  const updateSession = (
    updates: Partial<Pick<ParticipantSession, 'name' | 'email'>>
  ): ParticipantSession | null => {
    const currentSession = getSession();
    if (!currentSession) return null;

    const updatedSession = { ...currentSession, ...updates };
    Cookies.set(sessionKey, JSON.stringify(updatedSession), {
      expires: WORKSHOP_CONFIG.SESSION_TIMEOUT / (1000 * 60 * 60 * 24),
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });

    return updatedSession;
  };

  return { getSession, setSession, clearSession, updateSession };
};