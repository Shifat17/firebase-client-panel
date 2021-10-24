import React from "react";
import infinity from "./Infinity-1s-200px.gif";

const Loader = () => {
  return (
    <div>
      <img
        src={infinity}
        alt="Loading..."
        style={{ width: "200px", margin: "auto", display: "block" }}
      />
    </div>
  );
};
export default Loader;
