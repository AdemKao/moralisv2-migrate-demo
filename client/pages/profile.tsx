import { GetServerSideProps } from "next";
import React from "react";
import Profile from "../app/components/modules/Profile";
import { getSession } from "next-auth/react";

function profile() {
  return <Profile />;
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

export default profile;
