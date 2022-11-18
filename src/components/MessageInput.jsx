import React, {useState} from 'react';
import {useContext} from "react";
import {ChatContext} from "../context/ChatContext";
import {AuthContext} from "../context/AuthContext";
import { doc, updateDoc ,arrayUnion} from "firebase/firestore";
import {db} from "../firebase";
import {v4 as uuid} from "uuid"
import send from "../img/send.svg"

const MessageInput = ({styles}) => {
    const [text,setText] = useState("");
    const {data} = useContext(ChatContext);
    console.log(data.chatId)
    const {currentUser} = useContext(AuthContext)
    const handleSent= async ()=>{
        await updateDoc(doc(db, "chats", data.chatId), {
            messages: arrayUnion({
                id: uuid(),
                text,
                photoUrl:currentUser.photoURL,
                senderId: currentUser.uid,
            }),
        });
        setText("")

    }
    return (
        <div className={styles.messageInput}>
            <input onKeyDown={(e)=>{
                console.log(e.code)
                if(e.code==="Enter"){
                    return handleSent()
                }
            }}   value={text} placeholder="Введите сообщение..." onChange={(e)=>{setText(e.target.value)}} type="text"/>
            <div className={styles.iconsWrapper}>
                <button onClick={handleSent} className={styles.buttonSend}>
                    <img src={send} alt=""/>
                </button>
            </div>
        </div>
    );
};

export default MessageInput;