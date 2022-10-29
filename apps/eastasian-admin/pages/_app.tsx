import { AppProps } from 'next/app';
import Head from 'next/head';
import { CookiesProvider } from 'react-cookie';

function EastasianAdmin({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to eastasian-admin!</title>
      </Head>
      <main className="app">
        <CookiesProvider>
          <Component {...pageProps} />
        </CookiesProvider>
      </main>
    </>
  );
}

export default EastasianAdmin;
