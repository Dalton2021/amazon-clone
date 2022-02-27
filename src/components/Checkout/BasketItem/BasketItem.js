import React from "react";
import styles from "./BasketItem.module.css";
import { useStateValue } from "../../StateProvider/StateProvider";

const BasketItem = ({ id, title, rating, price, image, quantity }) => {
  const [{ basket }, dispatch] = useStateValue();

  //Removes item from basket/data layer
  const removeItem = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      item: {
        item: title,
        price: price,
        rating: rating,
        image: image,
        id: id,
      },
    });
    console.log(basket);
  };

  const randomId = () => {
    return Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, "");
  };

  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: randomId() || id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };

  return (
    <div>
      <div className={styles.checkoutProduct}>
        <img className={styles.checkoutProductImg} src={image} alt="product info" />
        <div className={styles.checkoutProductInfo}>
          <p className={styles.checkoutProductTitle}>{title}</p>
          <div className={styles.checkoutProductRating}>
            {Array(rating)
              .fill()
              .map((_, i) => (
                <p>⭐️</p>
              ))}
          </div>
          <p className={styles.checkoutProductPrice}>
            <small>$</small>
            <strong>
              {price.toLocaleString("en-US", {
                currency: "USD",
              })}
            </strong>
          </p>

          <div className={styles.btnsList}>
            <button className={styles.removeBtn} onClick={removeItem}>
              Remove from Basket
            </button>
            <button onClick={removeItem} className={styles.addSubBtn}>
              -
            </button>
            <p className={styles.quantity}>{quantity}</p>
            <button onClick={addToBasket} className={styles.addSubBtn}>
              +
            </button>
          </div>
        </div>
      </div>
      <div className={styles.basket}></div>
    </div>
  );
};

export default BasketItem;
