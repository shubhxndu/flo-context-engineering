import { ReactElement } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

/**
 * Workshop session page component.
 *
 * Displays workshop content and provides participant interaction
 * for a specific workshop session identified by the code parameter.
 *
 * @component
 */
const WorkshopSession = (): ReactElement => {
  const router = useRouter();
  const { code } = router.query;

  return (
    <>
      <Head>
        <title>{`Workshop ${code} - Workshop Companion`}</title>
        <meta
          name="description"
          content="Participate in an interactive workshop session"
        />
      </Head>

      <main className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <h1 className="text-2xl font-bold text-gray-900">
                Workshop {code}
              </h1>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Module 1 of 5
                </span>
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full w-1/5"></div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-md p-8 mb-6">
            <h2 className="text-xl font-semibold mb-4">
              Welcome to the Workshop
            </h2>
            <div className="prose max-w-none">
              <p className="text-gray-600 mb-4">
                This workshop will guide you through interactive modules
                designed to enhance your learning experience.
              </p>
              <p className="text-gray-600">
                Follow along with the instructor and participate in the
                activities as they become available.
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button className="bg-gray-300 text-gray-500 px-4 py-2 rounded-md cursor-not-allowed">
              Previous
            </button>
            <div className="flex space-x-2">
              <button className="bg-yellow-500 text-white px-3 py-2 rounded-md hover:bg-yellow-600 transition-colors">
                👍
              </button>
              <button className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition-colors">
                👎
              </button>
              <button className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition-colors">
                🤔
              </button>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Next
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default WorkshopSession;