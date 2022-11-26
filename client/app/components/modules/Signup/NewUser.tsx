import Image from "next/image";
import React from "react";
import Button from "../../elements/buttons/Button";
import { AiOutlineArrowDown } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { useAdapt } from "../../../context/useAdapt";
import { useMoralis } from "react-moralis";
import { getUser, getUserNameInUsed } from "./api/signup";
import Moralis from "moralis-v1";

function NewUser({ ...props }) {
  const { onMoralisAuth, onSignMessage, onWalletConnect } = useAdapt();
  const { _setUser, user, setUserData, logout } = useMoralis();
  const { authenticate, auth } = useMoralis();

  async function handleConnect() {
    if (!onMoralisAuth || !onSignMessage || !onWalletConnect)
      return alert("handleConnect Error");
    try {
      await logout();
      console.log("start handleConnect");
      let res = await onWalletConnect();
      console.log("res", res);
      let { account, chain, message } = res!;
      //Host Parse Server Use react-moralis

      // const { message } = await Moralis.Cloud.run("requestMessage", {
      //   address: account,
      //   // chain: parseInt(chain.id!, 16),
      //   chain: chain.id!,
      //   networkType: "evm",
      // });
      // let result = await authenticate({ signingMessage: message });

      //Moralis Parse Server
      // let result = await authenticate();

      // client
      console.log("auth", auth);
      let result = await onMoralisAuth({ account, chain, message });
      // let username = await getUserNameInUsed("dd");
      console.log("user!!!!", user, auth);
      //@ts-ignore
      // await setUserData(result.user);
      console.log("user", user);
      let username = await getUser();
      console.log(result);
      console.log("username", username);
      props.onSetSignupFlowStatus(1);
    } catch (e) {
      alert(`Reject Connect:${e}`);
    }
  }
  return (
    <>
      <div className=" text-[#D9D9D9] mx-5 pt-5 pb-20 flex items-center justify-end text-sm">
        Returning User? Click here
        <div className="ml-5 w-[180px]">
          <Button className="">SIGN IN</Button>
        </div>
      </div>
      <div className="flex items-center mx-[10%] flex-1 text-center">
        <div className="w-[100%]">
          <Image
            alt="ADAPT"
            src="/images/adapt_logo_nt.png"
            width={300}
            height={300}
          />
        </div>
        <div className="flex flex-col items-center w-[100%]">
          <h2 className="font-black text-[2.8rem] mb-1">
            New <span className="mx-1">ADAPT</span> User
          </h2>
          <span className="my-2 text-gray-300 text-xs ">
            Connect your wallet to experience <p>simpilicity</p>
          </span>
          <AiOutlineArrowDown className="my-10" />
          <Button onClick={handleConnect}>CONNECT WALLET</Button>
        </div>
      </div>
    </>
  );
}

export default NewUser;
