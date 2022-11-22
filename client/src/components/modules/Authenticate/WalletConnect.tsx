import { useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import React from "react";

function WalletConnect() {
  async function handleWalletConnect() {
    const { connectAsync } = useConnect();

    const { account, chain } = await connectAsync({
      connector: new InjectedConnector(),
    });
  }
  handleWalletConnect();
  // return <></>;
}

export default WalletConnect;
