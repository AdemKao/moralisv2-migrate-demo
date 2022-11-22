import React, { useContext } from "react";
import Image from "next/image";
import Button from "../../elements/buttons/Button";
import BulletGroup from "../../elements/Steps/BulletGroup";
import { useRouter } from "next/router";
import { FaUserCircle } from "react-icons/fa";
import Web3Context from "../../../context/Web3Context";

function ProfileDone({ ...props }) {
  const { push } = useRouter();
  const web3Context = useContext(Web3Context);
  const userName = web3Context.userName;
  const description = web3Context.description;
  const avatar = web3Context.avatar;
  return (
    <div className="flex flex-col items-center justify-center w-[100%] px-10 m-auto">
      <h2 className=" font-semibold text-1xl mb-1">REVIEW YOUR PROFILE</h2>

      <div className=" text-9xl text-gray-300  m-5">
        {avatar ? (
          <Image src={avatar} width={50} height={50} alt="avatar" />
        ) : (
          <FaUserCircle />
        )}
      </div>
      <div>{userName}asdasdasd</div>
      <div>{description}asdasdasd</div>

      <BulletGroup counts={3} step={3} />
      <Button
        onClick={() => {
          push("/send");
          props.onSetSignupFlowStatus(-1);
        }}
      >
        FINISH
      </Button>
    </div>
  );
}

export default ProfileDone;
