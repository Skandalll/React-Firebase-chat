import styles from "../scss/login.module.scss";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (e) {
      setError(true);
      console.log(e);
    }
  };
  return (
    <div>
      <div className={styles.root}>
        <div className={styles.form}>
          <h1>HellaChat</h1>
          <p>Вход</p>

          <form onSubmit={handleSubmit} action="" className={styles.inputs}>
            <input type="email" placeholder="Ваш email" />
            <input type="password" placeholder="Ваш пароль" />
            <button>Войти</button>
            {error ? (
              <div style={{ color: "red" }}>Такого аккаунта не существует</div>
            ) : null}
          </form>
          <p>
            У вас нет аккаунта? <Link to="/register">Зарегестрируйтесь</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Login;
