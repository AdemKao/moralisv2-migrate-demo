import React, { useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";

import Button from "../../elements/buttons/Button";
import BulletGroup from "../../elements/Steps/BulletGroup";

import { Input, Form } from "antd";
import { getUserNameInUsed } from "./api/signup";
import { rule } from "postcss";
import Image from "next/image";
import { ImCancelCircle } from "react-icons/im";

function SetupProfile({ ...props }) {
  const { TextArea } = Input;
  const [userNameInUsed, setuUserNameInUsed] = useState<boolean>(false);
  const [image, setImage] = useState<Blob | MediaSource | null>(null);
  const [createObjectURL, setCreateObjectURL] = useState<string | null>(null);

  const userName = useRef<string>();

  async function handleSummit(event: any) {
    if (!userName.current) return;
    console.log("handleSummit", userName);
    let inUsed = await getUserNameInUsed(userName.current);
    setuUserNameInUsed(inUsed);
  }
  function handleClientUploadImage(event: any) {
    console.log("!");
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  }
  function handleClientRemoveImage() {
    setCreateObjectURL(null);
  }

  return (
    <div className="flex flex-col items-center justify-center w-[100%] px-10 m-auto">
      <h2 className=" font-semibold text-1xl mb-1">SET UP YOUR PROFILE</h2>
      <Form className="flex flex-col items-center justify-center w-[100%] max-w-sm">
        <Form.Item>
          <div className=" text-9xl text-gray-300  m-5">
            {createObjectURL ? (
              <div className="relative max-w-[128px] max-h-[128px]">
                <ImCancelCircle
                  className=" text-[20px] absolute top-0 right-0"
                  onClick={() => handleClientRemoveImage()}
                />
                <Image
                  alt="Avatar"
                  src={createObjectURL}
                  width={128}
                  height={128}
                />
              </div>
            ) : (
              <FaUserCircle />
            )}
          </div>
          <div className="overflow-hidden relative hover:cursor-pointer	hover:underline hover:underline-offset-1">
            <p className="text-[#00ffd2] text-xs text-center ">
              Add a Profile Picture
            </p>
            <Input
              className="cursor-pointer block absolute  opacity-0 top-0 w-[100%]"
              aria-describedby="file_input_help"
              id="file_input"
              type="file"
              onChange={(event) => {
                console.log("onchange");
                handleClientUploadImage(event);
              }}
              onClick={(event: any) => {
                console.log("click");
                event.target.value = null;
              }}
            />
          </div>
        </Form.Item>
        <Form.Item
          // label="Username"
          className=" rounded-3xl w-[100%] "
          name="username"
          rules={[{ required: true, message: "Enter your username!" }]}
        >
          <Input
            allowClear
            className="bg-[#494747b3] text-[#cecbcb] rounded-3xl py-2 px-5 text-center self-baseline	border-none	"
            placeholder="Enter your username!"
            onChange={(e) => {
              userNameInUsed && setuUserNameInUsed(false);
              userName.current = e.target.value;
            }}
          />
          {userNameInUsed && (
            <span className=" text-red-600 px-5">
              user name is already used
            </span>
          )}
        </Form.Item>
        <Form.Item
          // label="Username"
          className=" rounded-2xl w-[100%] bg-[#494747b3] "
          name="description"
          rules={[{ required: false, message: "" }]}
        >
          <TextArea
            className="bg-[#494747b3] text-[#cecbcb]  rounded-2xl p-2 px-5 border-none	"
            rows={4}
            placeholder="Enter brief description here to let people know who you are."
            maxLength={6}
          />
        </Form.Item>

        <BulletGroup counts={3} step={2} />
        <Button
          onClick={(event: any) => {
            handleSummit(event);
            // props.onSetSignupFlowStatus(3);
          }}
        >
          NEXT
        </Button>
      </Form>
    </div>
  );
}

export default SetupProfile;
