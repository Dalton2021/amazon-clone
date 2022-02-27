import React from "react";
import { useStateValue } from "../StateProvider/StateProvider";
import styles from "./Product.module.css";

const Product = ({ id, title, price, image, rating }) => {
  // eslint-disable-next-line no-unused-vars
  const [{ basket }, dispatch] = useStateValue();

  const randomId = () => {
    return Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, "");
  };

  //Adds to data layer for checkout to pull
  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id || randomId(),
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };

  return (
    <div className={styles.product}>
      <div className={styles.productInfo}>
        <p>{title}</p>
        <p className={styles.productPrice}>
          <small>$</small>
          <strong>
            {price.toLocaleString("en-US", {
              currency: "USD",
            })}
          </strong>
        </p>
        <div className={styles.productRating}>
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>⭐️</p>
            ))}
        </div>
      </div>
      <img src={image} alt="product" className={styles.productImg} />
      <button onClick={addToBasket} className={styles.btn}>
        Add to Basket
      </button>
    </div>
  );
};

export default Product;
