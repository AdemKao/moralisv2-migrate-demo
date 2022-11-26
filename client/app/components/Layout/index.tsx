import { AppProps } from "next/app";
import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Sider from "./Sider";
import { useAccount } from "wagmi";
import { useSession } from "next-auth/react";
import FunctionManager from "../modules/FunctionManager";
import Head from "next/head";

function index({ ...props }) {
  const { isConnected } = useAccount();
  const { data, status } = useSession();

  return (
    <div className="flex bg-[#262626] h-[100%] justify-center">
      <FunctionManager>
        <Header />
        {isConnected && data && status && <Sider />}
        <main className="w-[100%]">
          <div className="w-[100%]">{props.children}</div>
        </main>
        {/* <Footer /> */}
      </FunctionManager>
    </div>
  );
}

export default index;
