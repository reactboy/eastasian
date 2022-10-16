import { AppProps } from 'next/app';
import Head from 'next/head';
import { Global, css } from '@emotion/react';

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
    <>
      <Head>
        <title>Jun Aida / eastasian</title>
        <link rel="stylesheet" href="https://use.typekit.net/ume0fnv.css" />
      </Head>
      <Global styles={baseCss} />
      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default Eastasian;
