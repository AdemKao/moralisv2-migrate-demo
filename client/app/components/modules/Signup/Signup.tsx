import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NewUser from "./NewUser";
import ProfileDone from "./ProfileDone";
import SetupProfile from "./SetupProfile";
import WalletConnected from "./WalletConnected";

function Signup() {
  const { push } = useRouter();
  const router = useRouter();

  const step = Number((router.query.step! as string) ?? 0);

  enum signupFlowStatusENUM {
    NewUser,
    WalletConnected,
    SetupProfile,
    ProfileDone,
  }
  useEffect(() => {
    setSignupFlowStatus(step);
  }, [step]);
  const [signupFlowStatus, setSignupFlowStatus] =
    useState<signupFlowStatusENUM>(0);
  function handleSignupFlowStatus(step: number) {
    if (step == -1) return push("/send");
    const options = { shallow: true };
    // setSignupFlowStatus(step);
    push(`/signup?step=${step}`, undefined, options);
  }
  return (
    <div className="h-[100vh] flex flex-col">
      {signupFlowStatus === signupFlowStatusENUM.NewUser && (
        <NewUser onSetSignupFlowStatus={handleSignupFlowStatus} />
      )}
      {signupFlowStatus === signupFlowStatusENUM.WalletConnected && (
        <WalletConnected onSetSignupFlowStatus={handleSignupFlowStatus} />
      )}
      {signupFlowStatus === signupFlowStatusENUM.SetupProfile && (
        <SetupProfile onSetSignupFlowStatus={handleSignupFlowStatus} />
      )}
      {signupFlowStatus === signupFlowStatusENUM.ProfileDone && (
        <ProfileDone onSetSignupFlowStatus={handleSignupFlowStatus} />
      )}
    </div>
  );
}

export default Signup;
