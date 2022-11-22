import React from "react";

function Bullet({ ...props }) {
  const className = ` ${props.className}`;
  return (
    <>
      <span className={className}></span>
    </>
  );
}

export default Bullet;
