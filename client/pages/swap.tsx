import { GetServerSideProps } from "next";
import React from "react";
import Swap from "../app/components/modules/Swap/";
import { getSession } from "next-auth/react";

function swap() {
  return <Swap />;
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  // if (!session) {
  //   return {
  //     redirect: {
  //       destination: "/",
  //       permanent: false,
  //     },
  //   };
  // }

  return {
    props: { session },
  };
};

export default swap;
