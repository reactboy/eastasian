import { AppProps } from 'next/app';
import Head from 'next/head';
import { Global, css } from '@emotion/react';

// NOTE(eastasian) reset css
import 'sanitize.css';
import 'sanitize.css/typography.css';
import 'sanitize.css/forms.css';
import 'sanitize.css/assets.css';

import { COLOR } from '@resume/libs/styles';

const baseCss = css`
  body {
    font-family: '"Noto Sans JP", sans-serif';
    color: ${COLOR['text']};
  }
`;

function Eastasian({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Jun Aida / eastasian</title>
      </Head>
      <Global styles={baseCss} />
      <main>
        <Component {...pageProps} />
        <input type="text" />
      </main>
    </>
  );
}

export default Eastasian;
