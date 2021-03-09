import * as React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import Head from 'next/head';
import Fonts from '../components/Fonts';

const theme = extendTheme({
  fonts: {
    heading: 'Raleway',
    body: 'Raleway',
  },
});

const App = ({ Component, pageProps }) => (
  <ChakraProvider theme={theme}>
    <Fonts />
    <Head />
    <Component {...pageProps} />
    <style global jsx>
      {`
        html, body {
          background: '#000'
        };
      }
      `}
    </style>
  </ChakraProvider>
);

export default App;
