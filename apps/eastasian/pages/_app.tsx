import { AppProps } from 'next/app';
import Head from 'next/head';
import { Global, css } from '@emotion/react';
import { Provider as ReduxProvider } from 'react-redux';

import { store } from '@resume/redux/app';

// NOTE(eastasian) reset css
import 'reset-css';
import 'sanitize.css';
import 'sanitize.css/typography.css';
import 'sanitize.css/forms.css';
import 'sanitize.css/assets.css';

import { COLOR } from '@resume/libs/styles';

const baseCss = css`
  body {
    font-family: 'futura pt', sans-serif;
    color: ${COLOR['text']};
  }
  a {
    color: inherit;
    text-decoration: inherit;
  }
`;

function Eastasian({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider store={store}>
      <Head>
        <title>Jun Aida / eastasian</title>
        <link rel="stylesheet" href="https://use.typekit.net/ume0fnv.css" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Global styles={baseCss} />
      <main>
        <Component {...pageProps} />
      </main>
    </ReduxProvider>
  );
}

export default Eastasian;
