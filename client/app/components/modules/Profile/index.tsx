import React from "react";
import { signOut, useSession } from "next-auth/react";
import { useDisconnect } from "wagmi";
import Button from "../../elements/buttons/Button";

function index() {
  const { data } = useSession();
  const { disconnectAsync } = useDisconnect();

  async function handleLogout() {
    await disconnectAsync();
    signOut({ callbackUrl: "/" });
  }
  return (
    <div>
      <h4>{data?.user.address}</h4>
      <p>Profile ID: {data?.user.profileId}</p>
      <p>Session Expiration Time: {data?.user.expirationTime}</p>
      <Button onClick={handleLogout()}>Log Out</Button>
    </div>
  );
}

export default index;
