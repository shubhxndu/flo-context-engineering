import { ReactElement } from 'react';
import { Html, Head, Main, NextScript } from 'next/document';

/**
 * Custom Document component for the Workshop Companion App.
 *
 * Defines the HTML document structure and meta tags for SEO
 * and performance optimization in SSR deployment.
 *
 * @component
 */
const Document = (): ReactElement => {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Workshop Companion App - Interactive workshop platform"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;