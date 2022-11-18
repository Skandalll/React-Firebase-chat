import React, { useEffect } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";

const Chat = ({ styles }) => {
  const { data } = useContext(ChatContext);
  return (
    <div className={styles.chat}>
      <div className={styles.chatInfo}>
        <p>{data.user?.displayName}</p>
      </div>
      <Messages styles={styles}></Messages>
      <MessageInput styles={styles}></MessageInput>
    </div>
  );
};

export default Chat;
