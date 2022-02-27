import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "./Login.module.css";
import { auth } from "../../firebase";

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          history.push("/");
        }
      })
      .catch((error) => alert(error.message));
  };

  const register = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          history.push("/");
        }
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className={styles.login}>
      <Link to="/">
        <img
          className={styles.loginLogo}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt="logo"
        />
      </Link>
      <div className={styles.loginContainer}>
        <h1>Sign in</h1>
        <form>
          <h5>Email</h5>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" />
          <h5>Password</h5>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" onClick={signIn} className={styles.btn}>
            Sign in
          </button>
          <p>
            By signing in you agree to this fake version of Amazon's Conditions of Use & Sale.
            Please see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
          </p>
        </form>
        <h5 className={styles.newHere}>New here?</h5>
        <button onClick={register} className={styles.btnRegister}>
          Create Amazon Account
        </button>
      </div>
    </div>
  );
};

export default Login;
