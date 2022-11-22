import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
  createClient,
  configureChains,
  defaultChains,
  WagmiConfig,
} from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { SessionProvider } from "next-auth/react";
import Layout from "../src/components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  const { provider, webSocketProvider } = configureChains(defaultChains, [
    publicProvider(),
  ]);

  const client = createClient({
    provider,
    webSocketProvider,
    autoConnect: true,
  });

  return (
    <WagmiConfig client={client}>
      <SessionProvider session={pageProps.session} refetchInterval={0}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </WagmiConfig>
  );
}

export default MyApp;
