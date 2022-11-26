import { signIn, signOut } from "next-auth/react";
import React from "react";
import {
  Connector,
  useAccount,
  useConnect,
  useDisconnect,
  useSignMessage,
} from "wagmi";
import AdaptContext from "../../../context/useAdapt";
import { InjectedConnector } from "wagmi/connectors/injected";
("wagmi/connectors/");
import { apiPost, apiPut } from "../../../utils/apiHandler";
import { walletConnectOption } from "../../../types/types";
import MoralisType from "moralis-v1";
import Moralis from "moralis-v1";
import { useMoralis } from "react-moralis";

function index({ ...props }) {
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();

  const { _setUser } = useMoralis();

  //@ts-ignore
  const verifyMessage = (message, signature, networkType) =>
    apiPost({
      endpoint: "auth/sign-message",
      params: {
        // authData: "moralisEth",
        message,
        signature,
        networkType,
      },
    });
  //@ts-ignore
  const requestMessage = (account, networkType, chain) =>
    apiPost({
      endpoint: "auth/request-message",
      params: {
        // authData: "moralisEth",
        address: account,
        chain: chain,
        networkType: networkType,
      },
    });

  async function handleWalletConnect(): Promise<walletConnectOption> {
    if (isConnected) {
      await disconnectAsync();
    }
    const { account, chain } = await connectAsync({
      connector: new InjectedConnector(),
    });
    const { message } = await requestMessage(account, "evm", chain.id);

    return { account: account.toLowerCase(), chain, message };
  }
  async function handleMoralisAuth(params: walletConnectOption) {
    console.log("handleMoralisAuth");
    // let { account, chain, message } = await handleWalletConnect();
    let { account, chain, message } = params;

    const userData = { address: account, chain: chain.id, network: "evm" };
    // const { message } = await apiPost("/auth/request-message", userData);

    const signature = await signMessageAsync({ message });
    console.log("signature", signature);
    try {
      // result = await signIn("credentials", {
      //   message,
      //   signature,
      //   redirect: false,
      // });
      // redirects to main page
      // push("/send");
      // const { user } = await verifyMessage(message, signature, "evm");
      const { user } = await verifyMessage(message, signature, "evm");

      let objUser: MoralisType.User = new Moralis.User({
        id: user.objectId,
        attributes: user,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
      await Moralis.User.become(user.sessionToken).then(
        function (user) {
          console.log("Moralis.User", user);
          // The current user is now set to user.
        },
        function (error) {
          // The token could not be validated.
        }
      );
      console.log("objUser", objUser, user);
      // await handleGetUserData({ ethAddress: account, signature, message });
      // const addeth = await handleUpdateAddress({
      //   id: user.objectId,
      //   ethAddress: account,
      // });
      // console.log("result ", addeth, user);
      // result = user;
      await _setUser(objUser);

      return { userData, message, signature, user, objUser };
    } catch (e) {
      console.log("error", e);
      return;
    }
  }

  interface MoralisUserDataOptions {
    ethAddress: string;
    signature: string;
    message: string;
  }
  async function handleGetUserData(options: MoralisUserDataOptions) {
    let { ethAddress, signature, message } = options;

    let route = `${process.env.NEXT_PUBLIC_HOST_SERVER_URL}/`;
    let endpoint = `users`;
    let params = {
      authData: {
        moralisEth: {
          id: ethAddress,
          signature: signature,
          data: message,
        },
        moralis: {
          id: ethAddress,
          signature: signature,
          data: message,
        },
      },
    };
    try {
      let result = await apiPost({ params, endpoint, route });

      console.log("handleGetUserData", result);
      return result;
    } catch (e) {
      console.log("handleGetUserData error", e);
    }
  }

  interface MoralisEthContext {
    id: string;
    ethAddress: string;
  }
  async function handleUpdateAddress(options: MoralisEthContext) {
    console.log("handleUpdateAddress");
    let { id, ethAddress } = options;
    let route = `${process.env.NEXT_PUBLIC_HOST_SERVER_URL}/`;
    let endpoint = `classes/_User/${id}`;
    let ACL = `${id}:{ read: true, write: true }`;

    console.log("ACL", ACL, JSON.stringify(ACL));
    let params = {
      ACL: { "98yFV1FLti": { read: true, write: true } },
      accounts: {
        __op: "AddUnique",
        objects: [ethAddress],
      },
      ethAddress: ethAddress,
      _method: "PUT",
      _ApplicationId: "K7QAo4atMIFFxARmiHHOqFA4jgFA202hPQj20YZ8",
      _ClientVersion: "js1.12.0",
      _InstallationId: "2175cc8b-a2d6-4526-a826-030882451e14",
      _SessionToken: "r:4df42124503e7cb64690a565adafd080",
    };
    let result = await apiPut({ params, endpoint, route });
    console.log("handleUpdateAddress", result);
  }
  async function handleDisConnect() {
    await disconnectAsync();
    signOut({ callbackUrl: "/" });
  }
  async function handleSignMessage() {}
  async function handleSignIn() {}

  return (
    <>
      <AdaptContext.Provider
        value={{
          onWalletConnect: handleWalletConnect,
          onMoralisAuth: handleMoralisAuth,
          onDisConnect: handleDisConnect,
          onSignMessage: handleSignMessage,
        }}
      >
        {props.children}
      </AdaptContext.Provider>
    </>
  );
}

export default index;
