import React from "react";

import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <Link to="/client/add" className="btn btn-outline-primary btn-lg">
      <i className="fas fa-plus" />
      <span style={{ marginLeft: "4px" }}> New </span>
    </Link>
  );
};

export default Sidebar;
