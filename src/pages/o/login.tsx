import { ReactElement } from 'react';
import Head from 'next/head';

/**
 * Organizer login page component.
 *
 * Provides authentication interface for workshop organizers
 * to access the management dashboard.
 *
 * @component
 */
const OrganizerLogin = (): ReactElement => {
  return (
    <>
      <Head>
        <title>Organizer Login - Workshop Companion</title>
        <meta
          name="description"
          content="Login to manage your workshops and sessions"
        />
      </Head>

      <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center mb-6">
              Organizer Login
            </h1>
            <p className="text-gray-600 text-center mb-6">
              Sign in to access your workshop dashboard
            </p>

            {/* Login form will be implemented here */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="organizer@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                />
              </div>

              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default OrganizerLogin;