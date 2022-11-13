import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';

function EastasianAdmin({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>eastasian admin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MantineProvider withNormalizeCSS>
        <NotificationsProvider position="top-right" autoClose={3000}>
          <main className="app">
            <Component {...pageProps} />
          </main>
        </NotificationsProvider>
      </MantineProvider>
    </>
  );
}

export default EastasianAdmin;
