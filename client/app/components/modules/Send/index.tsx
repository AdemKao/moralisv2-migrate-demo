import { GetServerSideProps } from "next";
import React from "react";
import { getSession } from "next-auth/react";

function index() {
  return <div>Send</div>;
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

export default index;
