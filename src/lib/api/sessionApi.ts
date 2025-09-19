import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { env } from '@/lib/env';

/**
 * Session API slice for participant-related operations.
 *
 * Provides RTK Query endpoints for workshop participation including
 * joining workshops, fetching state/modules, and submitting reactions.
 */

export interface JoinRequest {
  code: string;
  name: string;
  email?: string;
}

export interface JoinResponse {
  success: boolean;
  participant: {
    id: string;
    name: string;
    workshopCode: string;
  };
  workshop: {
    title: string;
    description: string;
  };
}

export interface StateResponse {
  currentModule: number;
  totalModules: number;
  isActive: boolean;
  lastUpdated: string;
}

export interface ModulesResponse {
  modules: Array<{
    id: string;
    title: string;
    content: string;
    order: number;
    isVisible: boolean;
  }>;
}

export interface ReactionRequest {
  code: string;
  type: 'thumbs_up' | 'thumbs_down' | 'confused';
  moduleId?: string;
}

export interface ReactionResponse {
  success: boolean;
  message: string;
}

export const sessionApi = createApi({
  reducerPath: 'sessionApi',
  baseQuery: fetchBaseQuery({
    baseUrl: env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Workshop', 'State', 'Modules', 'Reactions'],
  endpoints: (builder) => ({
    joinWorkshop: builder.mutation<JoinResponse, JoinRequest>({
      query: (body) => ({
        url: '/join',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Workshop'],
    }),
    getWorkshopState: builder.query<StateResponse, string>({
      query: (code) => `/w/${code}/state`,
      providesTags: ['State'],
    }),
    getWorkshopModules: builder.query<ModulesResponse, string>({
      query: (code) => `/w/${code}/modules`,
      providesTags: ['Modules'],
    }),
    submitReaction: builder.mutation<ReactionResponse, ReactionRequest>({
      query: ({ code, ...body }) => ({
        url: `/w/${code}/react`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Reactions'],
    }),
  }),
});

export const {
  useJoinWorkshopMutation,
  useGetWorkshopStateQuery,
  useGetWorkshopModulesQuery,
  useSubmitReactionMutation,
} = sessionApi;