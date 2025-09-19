import { configureStore } from '@reduxjs/toolkit';
import { sessionApi } from '@/lib/api/sessionApi';
import { organizerApi } from '@/lib/api/organizerApi';

/**
 * Redux store configuration for the Workshop Companion App.
 *
 * Integrates RTK Query APIs for session and organizer data management
 * with automatic caching, polling, and state synchronization.
 */
export const store = configureStore({
  reducer: {
    [sessionApi.reducerPath]: sessionApi.reducer,
    [organizerApi.reducerPath]: organizerApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          sessionApi.util.resetApiState.type,
          organizerApi.util.resetApiState.type,
        ],
      },
    }).concat(sessionApi.middleware, organizerApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;