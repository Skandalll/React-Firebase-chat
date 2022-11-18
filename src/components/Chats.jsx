import React, { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import {ChatContext} from "../context/ChatContext";
import { db } from "../firebase";
const Chats = ({ styles }) => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const {dispatch} = useContext(ChatContext);
    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                setChats(doc.data());
                console.log(doc.data())
            });

            return () => {
                unsub();
            };
        };

        currentUser.uid && getChats();
    }, [currentUser.uid]);
    const handleSelect = (user) => {
        dispatch({type:"CHANGE_USER",payload:user})
    }
    return (
    <div className={styles.chatsWrapper}>
        {Object.entries(chats)?.map((chat) => (
            <div
                onClick={()=>handleSelect(chat[1].userInfo)}
                className={styles.userChat}
                key={chat[0]}
            >
                <img src={chat[1].userInfo.photoURL} alt="" />
                <div className="userChatInfo">
                    <span>{chat[1].userInfo.displayName}</span>
                    <p>{chat[1].lastMessage?.text}</p>
                </div>
            </div>
        ))}

    </div>
  );
};

export default Chats;
