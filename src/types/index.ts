/**
 * Shared TypeScript types for the Workshop Companion App.
 *
 * Defines common interfaces and types used across the application
 * for consistent type checking and API contracts.
 */

import { z } from 'zod';

// Brand types for stronger typing
export type WorkshopCode = string & { readonly brand: unique symbol };
export type ParticipantId = string & { readonly brand: unique symbol };
export type ModuleId = string & { readonly brand: unique symbol };

// Workshop-related schemas and types
export const workshopCodeSchema = z
  .string()
  .length(4)
  .regex(/^[A-Z0-9]{4}$/)
  .transform((val) => val.toUpperCase() as WorkshopCode);

export const participantNameSchema = z
  .string()
  .min(1, 'Name is required')
  .max(50, 'Name must be less than 50 characters');

export const emailSchema = z
  .string()
  .email('Invalid email format')
  .optional()
  .or(z.literal(''));

// API Response wrapper
export const apiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    data: dataSchema,
    error: z.string().optional(),
    timestamp: z.string().datetime(),
  });

export type ApiResponse<T> = {
  success: boolean;
  data: T;
  error?: string;
  timestamp: string;
};

// Common error types
export interface AppError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

// Workshop states
export type WorkshopState = 'inactive' | 'active' | 'paused' | 'ended';

// Reaction types
export type ReactionType = 'thumbs_up' | 'thumbs_down' | 'confused';

// Module content structure
export interface ModuleContent {
  id: ModuleId;
  title: string;
  content: string;
  order: number;
  isVisible: boolean;
  estimatedDuration?: number;
}

// Participant information
export interface Participant {
  id: ParticipantId;
  name: string;
  email?: string;
  joinedAt: string;
  isActive: boolean;
}

// Workshop information
export interface Workshop {
  id: string;
  title: string;
  description: string;
  code: WorkshopCode;
  state: WorkshopState;
  currentModule: number;
  totalModules: number;
  participantCount: number;
  createdAt: string;
  startedAt?: string;
  endedAt?: string;
}

// Form schemas
export const joinFormSchema = z.object({
  code: workshopCodeSchema,
  name: participantNameSchema,
  email: emailSchema,
});

export const organizerLoginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type JoinFormData = z.infer<typeof joinFormSchema>;
export type OrganizerLoginData = z.infer<typeof organizerLoginSchema>;