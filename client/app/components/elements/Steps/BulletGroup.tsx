import { spawn } from "child_process";
import React from "react";
import Bullet from "./Bullet";

function BulletGroup({ ...props }) {
  const basic = " w-3 h-3 rounded-[50%] mx-3";
  const normal = "bg-gray-500";
  const focus = "bg-white";
  function implement() {
    let elements = [];
    for (let i = 1; i <= props.counts; i++) {
      elements.push(
        <span className={`${basic} ${i == props.step ? focus : normal}`} />
      );
    }
    return elements;
  }

  return (
    <div className="flex my-5">
      {props.counts && implement()}
      {/* <Bullet className="mx-3 bg-white" />
      <Bullet className="mx-3 bg-gray-500" />
      <Bullet className="mx-3 bg-gray-500" /> */}
    </div>
  );
}

export default BulletGroup;
