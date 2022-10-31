import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';

function EastasianAdmin({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>eastasian admin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MantineProvider>
        <main className="app">
          <Component {...pageProps} />
        </main>
      </MantineProvider>
    </>
  );
}

export default EastasianAdmin;
