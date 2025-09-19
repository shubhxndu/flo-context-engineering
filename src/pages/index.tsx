import { ReactElement } from 'react';
import Head from 'next/head';

/**
 * Landing page component for the Workshop Companion App.
 *
 * Provides entry points for both participants (join workshop) and
 * organizers (login to dashboard). This is the main entry point
 * for the application following Pages Router architecture.
 *
 * @component
 */
const HomePage = (): ReactElement => {
  return (
    <>
      <Head>
        <title>Workshop Companion App</title>
        <meta
          name="description"
          content="Join interactive workshops or manage them as an organizer"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Workshop Companion
            </h1>
            <p className="text-gray-600">
              Interactive workshop platform for engaging learning experiences
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-3">Join Workshop</h2>
              <p className="text-gray-600 mb-4">
                Enter your workshop code to participate
              </p>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                Join as Participant
              </button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-3">Organizer</h2>
              <p className="text-gray-600 mb-4">
                Manage your workshops and sessions
              </p>
              <button className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors">
                Organizer Login
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default HomePage;