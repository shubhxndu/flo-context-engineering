import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { env } from '@/lib/env';

/**
 * Organizer API slice for workshop management operations.
 *
 * Provides RTK Query endpoints for organizer authentication,
 * workshop creation, session control, and analytics.
 */

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  organizer: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
}

export interface Workshop {
  id: string;
  title: string;
  description: string;
  code: string;
  isActive: boolean;
  participantCount: number;
  createdAt: string;
}

export interface CreateWorkshopRequest {
  title: string;
  description: string;
  modules: Array<{
    title: string;
    content: string;
    order: number;
  }>;
}

export interface ControlRequest {
  workshopId: string;
  action: 'start' | 'pause' | 'stop' | 'next_module' | 'prev_module';
}

export const organizerApi = createApi({
  reducerPath: 'organizerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      // Add auth token if available
      const token = localStorage.getItem('organizerToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Organizer', 'Workshops', 'Analytics'],
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: '/organizer/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Organizer'],
    }),
    getWorkshops: builder.query<Workshop[], void>({
      query: () => '/organizer/workshops',
      providesTags: ['Workshops'],
    }),
    createWorkshop: builder.mutation<Workshop, CreateWorkshopRequest>({
      query: (body) => ({
        url: '/organizer/workshops',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Workshops'],
    }),
    controlWorkshop: builder.mutation<{ success: boolean }, ControlRequest>({
      query: ({ workshopId, action }) => ({
        url: `/organizer/workshops/${workshopId}/control`,
        method: 'POST',
        body: { action },
      }),
      invalidatesTags: ['Workshops'],
    }),
    getAnalytics: builder.query<any, string>({
      query: (workshopId) => `/organizer/workshops/${workshopId}/analytics`,
      providesTags: ['Analytics'],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetWorkshopsQuery,
  useCreateWorkshopMutation,
  useControlWorkshopMutation,
  useGetAnalyticsQuery,
} = organizerApi;