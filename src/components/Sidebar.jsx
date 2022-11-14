import React from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";
const Sidebar = ({ styles }) => {
  return (
    <div className="sidebar">
      <Navbar styles={styles}></Navbar>
      <Search styles={styles}></Search>
      <Chats styles={styles}></Chats>
    </div>
  );
};

export default Sidebar;
