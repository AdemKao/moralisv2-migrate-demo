import React from "react";
import { FaUserCircle } from "react-icons/fa";

import Button from "../../elements/buttons/Button";
import BulletGroup from "../../elements/Steps/BulletGroup";

import { Input, Form } from "antd";

function SetupProfile({ ...props }) {
  const { TextArea } = Input;
  return (
    <div className="flex flex-col items-center justify-center w-[100%] px-10 m-auto">
      <h2 className=" font-semibold text-1xl mb-1">SET UP YOUR PROFILE</h2>
      <Form className="flex flex-col items-center justify-center w-[100%] max-w-sm">
        <Form.Item>
          <div className=" text-9xl text-gray-300  m-5">
            <FaUserCircle />
          </div>
          <p className=" text-[#00ffd2] text-xs text-center ">
            Add a Profile Picture
          </p>
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
          />
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
          onClick={() => {
            props.onSetSignupFlowStatus(3);
          }}
        >
          NEXT
        </Button>
      </Form>
    </div>
  );
}

export default SetupProfile;
