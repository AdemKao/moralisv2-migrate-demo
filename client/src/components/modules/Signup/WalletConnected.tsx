import React from "react";
import { AiOutlineArrowDown } from "react-icons/ai";
import Button from "../../elements/buttons/Button";
import Bullet from "../../elements/Steps/Bullet";
import BulletGroup from "../../elements/Steps/BulletGroup";

function WalletConnected({ ...props }) {
  return (
    <div className=" flex flex-col items-center m-auto">
      <h2 className="font-bold text-4xl tracking-wider mb-1 text-center">
        YOU'RE CONNECTED!
      </h2>
      <div className="px-[20%] flex flex-col items-center text-center text-xs text-gray-300">
        <span className="my-2 ">
          Looks like it's the first time this wallet has connected to ADATP
        </span>
        <AiOutlineArrowDown className="my-10" />
        <span>The next Step is to set up your profile</span>
        <BulletGroup counts={3} step={1} />
        <Button
          onClick={() => {
            props.onSetSignupFlowStatus(2);
          }}
        >
          NEXT
        </Button>
      </div>
    </div>
  );
}

export default WalletConnected;
