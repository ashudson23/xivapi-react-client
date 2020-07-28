import { useEffect } from 'react';
import Head from 'next/head';

import { ThemeProvider } from 'styled-components';
import {
  StylesProvider,
  ThemeProvider as MuiThemeProvider,
} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import ScrollToTop from "../src/components/ScrollToTop";
import theme from '../src/theme';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>XIV React Client</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
          </MuiThemeProvider>
        </ThemeProvider>
      </StylesProvider>
      <ScrollToTop />
    </>
  );
};

export default MyApp;
