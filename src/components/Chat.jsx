import React, {useEffect} from 'react';
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import {useContext} from "react";
import { ChatContext } from "../context/ChatContext";

const Chat = ({styles}) => {
    const { data } = useContext(ChatContext);
    return (
        <div className={styles.chat}>
            <div className={styles.chatInfo}>
                <p>{data.user?.displayName}</p>
                <img src="https://cdn-icons-png.flaticon.com/512/4131/4131634.png" alt=""/>
                <img src="https://cdn-icons-png.flaticon.com/512/748/748137.png" alt=""/>
                <img src="https://cdn-icons-png.flaticon.com/512/2089/2089792.png" alt=""/>
            </div>
            <Messages styles={styles}></Messages>
            <MessageInput styles={styles}></MessageInput>
        </div>
    );
};

export default Chat;