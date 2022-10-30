import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';

function EastasianAdmin({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to eastasian-admin!</title>
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
