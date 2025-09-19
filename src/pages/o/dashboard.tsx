import { ReactElement } from 'react';
import Head from 'next/head';

/**
 * Organizer dashboard page component.
 *
 * Provides workshop management interface for organizers
 * including workshop creation, session control, and analytics.
 *
 * @component
 */
const OrganizerDashboard = (): ReactElement => {
  return (
    <>
      <Head>
        <title>Dashboard - Workshop Companion</title>
        <meta
          name="description"
          content="Manage your workshops and monitor participant engagement"
        />
      </Head>

      <main className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <h1 className="text-2xl font-bold text-gray-900">
                Workshop Dashboard
              </h1>
              <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors">
                Sign Out
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Active Workshops</h2>
              <p className="text-3xl font-bold text-blue-600">0</p>
              <p className="text-gray-600">Currently running</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Total Participants</h2>
              <p className="text-3xl font-bold text-green-600">0</p>
              <p className="text-gray-600">Across all sessions</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                  New Workshop
                </button>
                <button className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors">
                  View Analytics
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default OrganizerDashboard;