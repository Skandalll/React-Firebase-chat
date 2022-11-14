import React from "react";
import styles from "../scss/home.module.scss";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
const Home = () => {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <Sidebar styles={styles}></Sidebar>
        <Chat styles={styles}></Chat>
      </div>
    </div>
  );
};

export default Home;
