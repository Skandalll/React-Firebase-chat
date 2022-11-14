import cat from "../img/catr.png";
import Message from "./Message";
import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
const Messages = ({ styles }) => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);
  console.log(data);
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });
  }, [data.chatId]);
  return data.chatId == "null" ? (
    <div className={styles.startPage}>
      <h2>Тут пока пусто...</h2>
      <img src={cat} alt="" />
      <h3>
        но ты всегда можешь <br />
        завести себе новых друзей :)
      </h3>
    </div>
  ) : (
    <div className={styles.messages}>
      {messages.map((m) => (
        <Message
          photoUrl={m.photoUrl}
          key={m.id}
          message={m.text}
          messageOwner={m.senderId}
          styles={styles}
        />
      ))}
    </div>
  );
};

export default Messages;
