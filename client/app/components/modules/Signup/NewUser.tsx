import React from "react";
import Image from "next/image";
import Button from "../../elements/buttons/Button";
import { AiOutlineArrowDown } from "react-icons/ai";
import { signIn } from "next-auth/react";
import WalletConnect from "../Authenticate/WalletConnect";

function NewUser({ ...props }) {
  async function handleConnect() {
    WalletConnect();
    props.onSetSignupFlowStatus(1);
  }
  return (
    <>
      <div className=" text-[#D9D9D9] mx-5 pt-5 pb-20 flex items-center justify-end tex-sm">
        Returning User? Click here
        <div className="ml-5 w-[180px]">
          <Button className="">SIGN IN</Button>
        </div>
      </div>
      <div className="flex items-center mx-[10%] flex-1">
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
          <span className="my-2 text-gray-300 text-xs text-center">
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
