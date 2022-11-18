import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import photo from "../img/photo.png";
import styles from "../scss/login.module.scss";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { auth, db, storage } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    console.log(file);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: file
                ? downloadURL
                : "https://cdn-icons-png.flaticon.com/512/2520/2520879.png",
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: file
                  ? downloadURL
                  : "https://cdn-icons-png.flaticon.com/512/2520/2520879.png"
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            console.log(err);
          }
        });
      });
    } catch (err) {}
  };

  return (
    <div>
      <div className={styles.root}>
        <div className={styles.form}>
          <h1 className={styles.title}>Чат</h1>
          <p className={styles.subtitle}>Регистрация</p>
          <form onSubmit={handleSubmit} action="" className={styles.inputs}>
            <input type="text" placeholder="Ваш логин" />
            <input type="email" placeholder="Ваш email" />
            <input type="password" placeholder="Ваш пароль" />
            <input style={{ display: "none" }} id="file" type="file" />
            <label className={styles.label} htmlFor="file">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_4_77)">
                  <path
                    d="M26 27H6C5.20435 27 4.44129 26.6839 3.87868 26.1213C3.31607 25.5587 3 24.7956 3 24V8C3 7.20435 3.31607 6.44129 3.87868 5.87868C4.44129 5.31607 5.20435 5 6 5H26C26.7956 5 27.5587 5.31607 28.1213 5.87868C28.6839 6.44129 29 7.20435 29 8V24C29 24.7956 28.6839 25.5587 28.1213 26.1213C27.5587 26.6839 26.7956 27 26 27ZM6 7C5.73478 7 5.48043 7.10536 5.29289 7.29289C5.10536 7.48043 5 7.73478 5 8V24C5 24.2652 5.10536 24.5196 5.29289 24.7071C5.48043 24.8946 5.73478 25 6 25H26C26.2652 25 26.5196 24.8946 26.7071 24.7071C26.8946 24.5196 27 24.2652 27 24V8C27 7.73478 26.8946 7.48043 26.7071 7.29289C26.5196 7.10536 26.2652 7 26 7H6Z"
                    fill="#A66D3A"
                  />
                  <path
                    d="M21 15C20.4067 15 19.8266 14.8241 19.3333 14.4944C18.8399 14.1648 18.4554 13.6962 18.2284 13.1481C18.0013 12.5999 17.9419 11.9967 18.0576 11.4147C18.1734 10.8328 18.4591 10.2982 18.8787 9.87868C19.2982 9.45912 19.8328 9.1734 20.4147 9.05765C20.9967 8.94189 21.5999 9.0013 22.1481 9.22836C22.6962 9.45543 23.1648 9.83994 23.4944 10.3333C23.8241 10.8266 24 11.4067 24 12C24 12.7957 23.6839 13.5587 23.1213 14.1213C22.5587 14.6839 21.7957 15 21 15ZM21 11C20.8022 11 20.6089 11.0587 20.4444 11.1685C20.28 11.2784 20.1518 11.4346 20.0761 11.6173C20.0004 11.8 19.9806 12.0011 20.0192 12.1951C20.0578 12.3891 20.153 12.5673 20.2929 12.7071C20.4327 12.847 20.6109 12.9422 20.8049 12.9808C20.9989 13.0194 21.2 12.9996 21.3827 12.9239C21.5654 12.8482 21.7216 12.72 21.8315 12.5556C21.9414 12.3911 22 12.1978 22 12C22 11.7348 21.8946 11.4804 21.7071 11.2929C21.5196 11.1054 21.2652 11 21 11Z"
                    fill="#A66D3A"
                  />
                  <path
                    d="M26 27C25.8353 26.9991 25.6733 26.9576 25.5285 26.8791C25.3837 26.8006 25.2606 26.6875 25.17 26.55L20.83 20.05C20.7385 19.9138 20.615 19.8023 20.4702 19.7252C20.3255 19.6481 20.164 19.6077 20 19.6077C19.836 19.6077 19.6745 19.6481 19.5298 19.7252C19.385 19.8023 19.2615 19.9138 19.17 20.05L18.83 20.55C18.6737 20.744 18.4506 20.8727 18.2044 20.9109C17.9581 20.949 17.7065 20.8939 17.4988 20.7562C17.2911 20.6186 17.1423 20.4084 17.0815 20.1668C17.0206 19.9251 17.0522 19.6695 17.17 19.45L17.5 18.94C17.7736 18.5274 18.1451 18.189 18.5813 17.9549C19.0176 17.7208 19.5049 17.5983 20 17.5983C20.495 17.5983 20.9824 17.7208 21.4186 17.9549C21.8548 18.189 22.2263 18.5274 22.5 18.94L26.83 25.45C26.9747 25.6704 27.0265 25.9391 26.9741 26.1976C26.9216 26.4561 26.7692 26.6833 26.55 26.83C26.3889 26.9427 26.1966 27.0022 26 27Z"
                    fill="#A66D3A"
                  />
                  <path
                    d="M5.99999 27C5.80838 26.9995 5.62095 26.9439 5.45999 26.84C5.23751 26.6965 5.08099 26.4707 5.02475 26.212C4.96851 25.9533 5.01715 25.6829 5.15999 25.46L11.39 15.84C11.6604 15.4222 12.0304 15.0782 12.4669 14.839C12.9033 14.5999 13.3923 14.4731 13.89 14.47C14.3849 14.4698 14.8722 14.592 15.3084 14.8258C15.7446 15.0596 16.1161 15.3977 16.39 15.81L22.81 25.45C22.9278 25.6695 22.9593 25.9252 22.8985 26.1668C22.8377 26.4084 22.6888 26.6186 22.4811 26.7563C22.2734 26.8939 22.0218 26.949 21.7756 26.9109C21.5294 26.8727 21.3063 26.744 21.15 26.55L14.72 16.92C14.6294 16.7824 14.5062 16.6694 14.3614 16.5909C14.2166 16.5123 14.0547 16.4708 13.89 16.47C13.7244 16.4719 13.5618 16.515 13.417 16.5952C13.2721 16.6755 13.1494 16.7906 13.06 16.93L6.83999 26.54C6.74964 26.6808 6.6254 26.7967 6.47864 26.8771C6.33189 26.9574 6.16731 26.9997 5.99999 27Z"
                    fill="#A66D3A"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_4_77">
                    <rect width="32" height="32" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <p>Добавить аватар</p>
            </label>
            <button>Создать</button>
            <Link
              style={{ width: "100%", paddingLeft: "30px" }}
              to={"/home"}
            ></Link>
          </form>
          {error ? (
            <div style={{ color: "red" }}>Возникла ошибка,возможно такой аккаунт уже существует <br/> ,или пароль меньше 6 символов</div>
          ) : null}

          <p>
            У вас уже есть аккаунт? <Link to="/login">Войдите</Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
