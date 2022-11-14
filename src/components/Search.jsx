import React, {useContext, useState} from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import {AuthContext} from "../context/AuthContext";

const Search = ({ styles }) => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const {currentUser} = useContext(AuthContext)
  const handleSelect = async ()=>{
    const combinedID = currentUser.uid > user.uid ? currentUser.uid + user.uid: user.uid + currentUser.uid
    try {
      const res = await getDoc(doc(db,"chats",combinedID))
      if (!res.exists()){
        await setDoc(doc(db, "chats", combinedID), { messages: [] });
      }
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [combinedID + ".userInfo"]: {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        }})
    }catch (e){

    }
    setUser(null);
    setUsername("")

  }
  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (e) {
      setError(true);
    }
  };
  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };
  return (
    <div className={styles.search}>
      <div className={styles.searchForm}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/149/149852.png"
          alt=""
        />
        <input
            value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Найти пользователя..."
          type="text"
        />
      </div>
      {error && <div>Что-то полшло не так</div>}
      {user && (
        <div onClick={handleSelect} className={styles.userChat}>
          <img src={user.photoURL} alt="" />
          <div className="userChatInfo"></div>
          <div className={styles.text}>
            <span>{user.displayName}</span>
            <p>Привет.Как дела?</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
