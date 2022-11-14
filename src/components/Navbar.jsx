import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import {ChatContext} from "../context/ChatContext";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";
const Navbar = ({ styles }) => {
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const handleExit =()=>{
    signOut(auth);
    dispatch({type:"SET_NULL",payload:"null"})
  }
  console.log(currentUser);
  return (
    <div>
      <div className="navbar">
        <div className={styles.user}>
          <img
            className={styles.user__icon}
            src={currentUser.photoURL}
            alt=""
          />
          <span className={styles.user__name}>{currentUser.displayName}</span>
          <button onClick={() => handleExit()} className={styles.user__logout}>
            Выйти
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
