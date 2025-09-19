import { ReactElement } from 'react';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '@/store';
import '@/styles/globals.css';

/**
 * Root App component for the Workshop Companion App.
 *
 * Provides Redux store context and global styles to all pages.
 * This component wraps all pages in the Pages Router architecture.
 *
 * @component
 */
const App = ({ Component, pageProps }: AppProps): ReactElement => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default App;