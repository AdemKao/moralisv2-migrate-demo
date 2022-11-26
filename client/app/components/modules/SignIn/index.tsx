import React from "react";
import {
  Connector,
  useConnect,
  useDisconnect,
  useAccount,
  useSignMessage,
} from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import apiPost from "../../../utils/apiHandler";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

const wallets = [
  {
    name: "Metamask",
    logoPath: "/assets/wallets/metamask.svg",
    connector: new MetaMaskConnector(),
  },
  {
    name: "Coinbase Wallet",
    logoPath: "/assets/wallets/coinbase.svg",
    disabled: true,
  },
  {
    name: "WalletConnect",
    logoPath: "/assets/wallets/walletconnect.svg",
    connector: new WalletConnectConnector({
      options: {
        rpc: ["https://mainnet.infura.io/v3/84842078b09946638c03157f83405213"],
      },
    }),
  },
  {
    name: "Injected",
    logoPath: "/assets/wallets/eth.svg",
    connector: new InjectedConnector(),
  },
];

function index() {
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { push } = useRouter();

  async function handleAuth(connector?: Connector, disabled?: boolean) {
    if (disabled) {
      alert("Setup it first in the Authentication.tsx");
      return;
    }

    if (isConnected) {
    }
    await disconnectAsync();
    console.log("!!");

    const { account, chain } = await connectAsync({ connector });

    const userData = { address: account, chain: chain.id, network: "evm" };

    console.log(userData);
    const { message } = await apiPost("/auth/request-message", userData);

    const signature = await signMessageAsync({ message });

    try {
      await signIn("credentials", { message, signature, redirect: false });
      // redirects to main page
      push("/");
    } catch (e) {
      return;
    }
    // const { account, chain } = await connectAsync({
    //   connector: new InjectedConnector(),
    // });
    // const userData = { address: account, chain: chain.id, network: "evm" };

    console.log(userData);
  }
  return (
    <div>
      <div>SignIn</div>
      {wallets.map(({ name, logoPath, connector, disabled }) => (
        <div key={name}>
          <button onClick={() => handleAuth(connector, disabled)}>
            {name}
          </button>
        </div>
      ))}
    </div>
  );
}

export default index;
