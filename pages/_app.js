import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import store from "../store";
import Head from "next/head";
import { Provider } from "react-redux";
import { ChakraProvider, extendTheme, ColorModeScript } from "@chakra-ui/react"; // for chakra;
import Layout from "../components/layout";

// This is the chainId your dApp will work on.
const activeChainId = ChainId.Rinkeby;

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};
const theme = extendTheme({ config });

// <ColorModeScript initialColorMode={theme.config.initialColorMode} />

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ThirdwebProvider desiredChainId={activeChainId}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <ChakraProvider theme={theme}>
          <Layout>
            <Head>
              <title>Cryptozon</title>
            </Head>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </ThirdwebProvider>
    </Provider>
  );
}

export default MyApp;
