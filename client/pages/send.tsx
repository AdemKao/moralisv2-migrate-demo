import { GetServerSideProps } from "next";
import React from "react";
import Send from "../src/components/modules/Send";
import { getSession } from "next-auth/react";

function send() {
  return <Send />;
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

export default send;
