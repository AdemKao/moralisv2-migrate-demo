import { GetServerSideProps } from "next";
import React from "react";
import Landing from "../app/components/modules/Landing";
import { getSession } from "next-auth/react";

function index() {
  return <Landing />;
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/send",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

export default index;
