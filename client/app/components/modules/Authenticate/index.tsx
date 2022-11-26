import React from "react";

function index({ ...props }) {
  return <>{props.children}</>;
}

export default index;
