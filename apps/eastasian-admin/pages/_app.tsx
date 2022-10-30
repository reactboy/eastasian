import { AppProps } from 'next/app';
import Head from 'next/head';

function EastasianAdmin({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to eastasian-admin!</title>
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default EastasianAdmin;
