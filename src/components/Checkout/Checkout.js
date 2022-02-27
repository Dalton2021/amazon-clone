import React from "react";
import styles from "./Checkout.module.css";
import Subtotal from "../Subtotal/Subtotal";
import { useStateValue } from "../StateProvider/StateProvider";
import BasketItem from "./BasketItem/BasketItem";

const Checkout = () => {
  const [{ basket, user }] = useStateValue();
  // console.log(`the big basket`, basket);

  // New basket to itirate over the basic basket, making sure no repeating products are renderered.
  let newBasket = basket.filter((value, index, self) => {
    return self.findIndex((v) => v.title === value.title) === index;
  });

  // Gathers total of each product in cart
  const countTotal = (titleCheck) => {
    return basket
      .map((basketItems) => basketItems)
      .reduce((itemCount, obj) => {
        obj.title === titleCheck ? (itemCount += 1) : console.log(titleCheck);
        return itemCount;
      }, 0);
  };

  return (
    <div className={styles.checkout}>
      <div className={styles.checkoutLeft}>
        <img
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492667_.jpg"
          className={styles.checkoutAd}
          alt="Ad"
        />
        <div className="">
          <h3 className={styles.userGreeting}>{user ? `Hello, ${user.email}` : null}</h3>
          <h2 className={styles.checkoutTitle}>Your Shopping Basket</h2>
          {newBasket
            .sort(function (x, y) {
              return x.price - y.price;
            })
            .map((product) => (
              <BasketItem
                id={product.id}
                title={product.title}
                image={product.image}
                price={product.price}
                rating={product.rating}
                quantity={countTotal(product.title)}
              ></BasketItem>
            ))}
        </div>
      </div>
      <div className={styles.checkoutRight}>
        <Subtotal />
      </div>
    </div>
  );
};

export default Checkout;
