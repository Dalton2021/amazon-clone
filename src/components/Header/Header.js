import React from "react";
import styles from "./Header.module.css";
import Logo from "../../images/amazon-logo.png";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider/StateProvider";
import { auth } from "../../firebase";

const Header = () => {
  const [{ basket, user }] = useStateValue();

  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
    }
  };

  return (
    <div className={styles.header}>
      <Link to="/">
        <img src={Logo} alt="logo" className={styles.logo} />
      </Link>
      <div className={styles.search}>
        <input className={styles.input} type="text" />
        <SearchIcon className={styles.searchIcon} />
      </div>
      <div className={styles.nav}>
        <Link to="/login" className={styles.link}>
          <div onClick={handleAuthentication} className={styles.option}>
            <span className={styles.optionLineOne}>
              {user ? `Hello ${user.displayName}` : "Hello Guest"}
            </span>
            <span className={styles.optionLineTwo}>{user ? "Sign Out" : "Sign In"}</span>
          </div>
        </Link>
        <div className={styles.option}>
          <span className={styles.optionLineOne}>Returns</span>
          <span className={styles.optionLineTwo}>& Orders</span>
        </div>
        <div className={styles.option}>
          <span className={styles.optionLineOne}>Your</span>
          <span className={styles.optionLineTwo}>Prime</span>
        </div>
        <Link to="/checkout" className={styles.link}>
          <div className={styles.optionBasket}>
            <ShoppingBasketIcon className={styles.baskets} />
            <span className={`${styles.optionLineTwo} ${styles.basketCount}`}>
              {basket?.length > 0 ? basket.length : ''}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
