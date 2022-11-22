import { type } from "os";
import React from "react";

type ButtonPropsType = {
  name: string;
  className?: string;
  onClick: () => {};
};

function Button({ ...props }) {
  const className = `text-black  bg-[#00ffd2] rounded-[200px]  py-2 table-fixed w-[100%] min-w-[100px] max-w-[180px] text-1xl font-medium ${props.className}`;
  return (
    <button className={className} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

export default Button;
