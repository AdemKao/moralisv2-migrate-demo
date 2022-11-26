import React from "react";
import Image from "next/image";
import { BiChevronDown } from "react-icons/bi";

function SwitchChain() {
  return (
    <div className="flex text-center items-center">
      <div className="flex px-3 py-2 rounded-lg bg-[#7e7d7d36]">
        <div className="px-2">
          <Image
            src="/images/adapt_logo_nt.png"
            width={20}
            height={20}
            alt="token image"
          />
        </div>
        <span>BSC</span>
      </div>
      <BiChevronDown className="rounded-full m-2 bg-[#7e7d7d36]" />
    </div>
  );
}

export default SwitchChain;
