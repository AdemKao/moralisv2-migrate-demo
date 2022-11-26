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
import Layout from "../app/components/Layout";
import Moralis from "moralis-v1";
import { MoralisProvider } from "react-moralis";

function MyApp({ Component, pageProps }: AppProps) {
  const { provider, webSocketProvider } = configureChains(defaultChains, [
    publicProvider(),
  ]);

  const client = createClient({
    provider,
    webSocketProvider,
    autoConnect: true,
  });

  const appId = String(
    process.env.NEXT_PUBLIC_PRODUCTION === "TRUE"
      ? process.env.NEXT_PUBLIC_APPLICATION_ID
      : process.env.NEXT_PUBLIC_HOST_APPLICATION_ID
  );
  const serverUrl = String(
    process.env.NEXT_PUBLIC_PRODUCTION === "TRUE"
      ? process.env.NEXT_PUBLIC_SERVER_URL
      : process.env.NEXT_PUBLIC_HOST_SERVER_URL
  );

  Moralis.initialize(appId);
  Moralis.serverURL = serverUrl;
  console.log("serverUrl", serverUrl);
  console.log("appId", appId);

  return (
    <MoralisProvider appId={appId} serverUrl={serverUrl}>
      <WagmiConfig client={client}>
        <SessionProvider session={pageProps.session} refetchInterval={0}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SessionProvider>
      </WagmiConfig>
    </MoralisProvider>
  );
}

export default MyApp;
