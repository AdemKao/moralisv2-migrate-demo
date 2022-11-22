import React from "react";
import {
  Connector,
  useAccount,
  useConnect,
  useDisconnect,
  useSignMessage,
} from "wagmi";
import { signIn, signOut, useSession } from "next-auth/react";
import { InjectedConnector } from "wagmi/connectors/injected";

import Button from "../../elements/buttons/Button";
import Image from "next/image";
import apiPost from "../../../utils/apiPost";

import { useRouter } from "next/router";

function index() {
  const { data, status } = useSession();

  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { push } = useRouter();

  console.log("Landing", data, status);

  async function handleLogout() {
    await disconnectAsync();
    signOut({ callbackUrl: "/" });
  }
  async function handleAuth(connector?: Connector, disabled?: boolean) {
    if (disabled) {
      alert("Setup it first in the Authentication.tsx");
      return;
    }

    if (isConnected) {
      await disconnectAsync();
    }

    const { account, chain } = await connectAsync({
      connector: new InjectedConnector(),
    });

    const userData = { address: account, chain: chain.id, network: "evm" };

    console.log(userData);
    const { message } = await apiPost("/auth/request-message", userData);

    const signature = await signMessageAsync({ message });

    try {
      await signIn("credentials", { message, signature, redirect: false });
      // redirects to main page
      push("/send");
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
    <div className="flex flex-col items-center max-w-[1080px] m-auto h-screen	justify-center">
      <div className=" mb-5">
        <Image
          alt="ADAPT"
          src="/images/adapt_logo_nt.png"
          width={300}
          height={300}
        />
      </div>
      <h1 className=" text-[2.8rem] text-w mb-[150px] font-medium">
        ＡＤＡＰＴ
      </h1>

      <div className="w-[100%] flex justify-between px-[2%] max-w-[550px]">
        <Button onClick={() => push("/signup")}>NEW USER</Button>
        <Button
          onClick={() => {
            handleAuth();
          }}
        >
          EXISTING USER
        </Button>
      </div>
    </div>
  );
}

export default index;
