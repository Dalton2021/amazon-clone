import React from "react";
import styles from "./IndivOrder.module.css";
import moment from "moment";
import CurrencyFormat from "react-currency-format";
import BasketItem from "../../Checkout/BasketItem/BasketItem";
import { useStateValue } from "../../StateProvider/StateProvider";

const IndivOrder = ({ order }) => {
  const [{ basket }] = useStateValue();

  // Gathers total of each product in cart. Altered for the data component
  const countTotal = (titleCheck) => {
    return order.data.basket
      ?.map((basketItems) => basketItems)
      .reduce((itemCount, obj) => {
        obj.title === titleCheck ? (itemCount += 1) : console.log();
        return itemCount;
      }, 0);
  };

  // New basket to itirate over the basic basket, making sure no repeating products are renderered. Altered for the data component
  let newBasket = order.data.basket?.filter((value, index, self) => {
    return self.findIndex((v) => v.title === value.title) === index;
  });

  let total = 0;
  // eslint-disable-next-line no-unused-vars
  let basketTotal = basket.map((items) => (total += items.price));

  return (
    <div className={styles.order}>
      <h2>Order</h2>
      <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
      <p className={styles.orderID}>
        <small>{order.id}</small>
      </p>
      {newBasket
        .sort(function (x, y) {
          return x.price - y.price;
        })
        .map((item) => (
          <BasketItem
            changeable={false}
            id={item.id}
            key={item.id}
            title={item.title}
            image={item.image}
            price={item.price}
            rating={item.rating}
            quantity={countTotal(item.title)}
          />
        ))}
      <CurrencyFormat
        renderText={(value) => (
          <h3 className={styles.orderTotal}>
            Order total: <span>${value}</span>
          </h3>
        )}
        decimalScale={2}
        value={order.data.amount / 100}
        displayType={"text"}
        thousandSeparator={true}
      />
    </div>
  );
};

export default IndivOrder;
