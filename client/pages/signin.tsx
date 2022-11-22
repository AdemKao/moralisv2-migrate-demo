import { Sign } from "crypto";
import React from "react";
import SignIn from "../src/components/modules/SignIn";
import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";

function signin() {
  return <SignIn />;
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

export default signin;
