import React from "react";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";

const Message = ({ styles, message, key, messageOwner, photoUrl }) => {
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);
  return (
    <div
      className={
        currentUser.uid !== messageOwner ? styles.messageOwner : styles.message
      }
    >
      <img src={photoUrl} alt="img" />
      <p>{message}</p>
    </div>
  );
};

export default Message;
