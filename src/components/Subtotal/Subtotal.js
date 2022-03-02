import React from "react";
import styles from "./Subtotal.module.css";
import CurrencyFormat from "react-currency-format";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../StateProvider/StateProvider";

const Subtotal = () => {
  const history = useHistory();
  const [{ basket }] = useStateValue();

  let total = 0;

  //Total cart value
  // eslint-disable-next-line no-unused-vars
  let basketTotal = basket.map((items) => (total += items.price));

  //count total of each item in cart
  const countTotal = (titleCheck) => {
    return basket
      .map((basketItems) => basketItems)
      .reduce((itemCount, obj) => {
        obj.title === titleCheck ? (itemCount += 1) : console.log();
        return itemCount;
      }, 0);
  };

  //Gathers total of individual items in the cart basket
  const countIndividualItemTotal = (titleCheck) => {
    return basket
      .map((basketItems) => basketItems)
      .reduce((itemCount, obj) => {
        obj.title === titleCheck ? (itemCount += obj.price) : console.log();
        return itemCount;
      }, 0);
  };

  //New basket to itirate over the basic basket, making sure no repeating products are renderered.
  let newBasket = basket.filter((value, index, self) => {
    return self.findIndex((v) => v.title === value.title) === index;
  });

  return (
    <div className={styles.subtotal}>
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p className={styles.cartTitle}>Basket Total</p>
            {newBasket
              .sort(function (x, y) {
                return x.price - y.price;
              })
              .map((product) => (
                <div key={product.id} className={styles.inline}>
                  <p className={styles.cartItems}>{product.title}</p>
                  <p>
                    <small className={styles.subtotalItemCount}>
                      (x {countTotal(product.title)})
                    </small>
                    <strong className={styles.subtotalItemPrice}>
                      {countIndividualItemTotal(product.title).toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </strong>
                  </p>
                </div>
              ))}
            <p className={styles.totalPrice}>
              Subtotal ({basket.length} items):
              <strong>{` ${value}`}</strong>
            </p>
            <small className={styles.subtotalGift}>
              <input type="checkbox" />
              This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={total}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
      <button onClick={(e) => history.push("/payment")}>Proceed to Checkout</button>
    </div>
  );
};

export default Subtotal;
