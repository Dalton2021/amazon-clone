import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../../firebase";
import styles from "./CreateAccount.module.css";

const CreateAccount = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");

  const register = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          auth.user.updateProfile({
            displayName: firstName,
          });
          history.push("/");
        }
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className={styles.createAccount}>
      <Link to="/">
        <img
          className={styles.loginLogo}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt="logo"
        />
      </Link>
      <div className={styles.container}>
        <h1>Sign Up</h1>
        <form>
          <h5>First Name</h5>
          <input value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" />
          <h5>Email</h5>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
          <h5>Password</h5>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
          <p>
            By creating this account you agree to this fake version of Amazon's Conditions of Use &
            Sale. Please see our Privacy Notice, our Cookies Notice and our Interest-Based Ads
            Notice.
          </p>
          <button onClick={register} className={styles.btn}>
            Create Account
          </button>
        </form>
        <h5 className={styles.alreadyRegistered}>Have an Account?</h5>
        <Link to="/login">
          <button className={styles.btnSignIn}>Sign in</button>
        </Link>
      </div>
    </div>
  );
};

export default CreateAccount;
