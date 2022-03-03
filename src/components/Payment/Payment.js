import React, { useEffect, useState } from "react";
import styles from "./Payment.module.css";
import CurrencyFormat from "react-currency-format";
import { Link, useHistory } from "react-router-dom";
// import axios from "axios";
import { instance } from "../../axios";
import { database } from "../../firebase";
import { getBasketTotal } from "../Reducer/Reducer";
import { useStateValue } from "../StateProvider/StateProvider";
import BasketItem from "../Checkout/BasketItem/BasketItem";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

const Payment = () => {
  const [{ basket, user }, dispatch] = useStateValue();

  const history = useHistory();
  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  // New basket to itirate over the basic basket, making sure no repeating products are renderered.
  let newBasket = basket.filter((value, index, self) => {
    return self.findIndex((v) => v.title === value.title) === index;
  });

  let total = 0;
  // eslint-disable-next-line no-unused-vars
  let basketTotal = basket.map((items) => (total += items.price));

  // Gathers total of each product in cart
  const countTotal = (titleCheck) => {
    return basket
      .map((basketItems) => basketItems)
      .reduce((itemCount, obj) => {
        obj.title === titleCheck ? (itemCount += 1) : console.log();
        return itemCount;
      }, 0);
  };

  useEffect(() => {
    // generate the special stripe secret which allows us to charge a customer
    const getClientSecret = async () => {
      const response = await instance({
        method: "post",
        // Stripe expects the total in a currencies subunits
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };

    getClientSecret();
  }, [basket]);

  console.log("THE SECRET IS >>>", clientSecret);
  console.log("user is:", user);

  //processes payment card
  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    // eslint-disable-next-line no-unused-vars
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        // paymentIntent = payment confirmation

        database.collection("users").doc(user?.uid).collection("orders").doc(paymentIntent.id).set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });
        

        setSucceeded(true);
        setError(null);
        setProcessing(false);
        dispatch({
          type: "EMPTY_BASKET",
        });
        history.replace("/orders");
      });
  };

  // Listens for changes and errors in the card details
  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <div className={styles.payment}>
      <div className={styles.container}>
        <h1>Checkout ({<Link to="/checkout">{basket?.length} items</Link>})</h1>
        {/* Delivery Address */}
        <div className={styles.paymentSection}>
          <div className={styles.paymentTitle}>
            <h3>Delivery Address</h3>
          </div>
          <div className={styles.paymentAddress}>
            <p>{user?.displayName}</p>
            <p>123 React Lane</p>
            <p>Richmond, KY</p>
          </div>
        </div>
        {/* Review Items */}
        <div className={styles.paymentSection}>
          <div className={styles.paymentTitle}>
            <h3>Review items and delivery</h3>
          </div>
          <div className={styles.paymentItems}>
            {newBasket
              .sort(function (x, y) {
                return x.price - y.price;
              })
              .map((product) => (
                <BasketItem
                  id={product.id}
                  key={product.id}
                  title={product.title}
                  image={product.image}
                  changeable={false}
                  price={product.price}
                  rating={product.rating}
                  quantity={countTotal(product.title)}
                ></BasketItem>
              ))}
          </div>
        </div>
        {/* Payment Method */}
        <div className={styles.paymentSection}>
          <div className={styles.paymentTitle}>
            <h3>Payment Method</h3>
          </div>
          <div className={styles.paymentDetails}>
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className={styles.paymentPriceContainer}>
                <CurrencyFormat
                  renderText={(value) => (
                    <h3 className={styles.paymentTotal}>
                      Order total: <span>${value}</span>
                    </h3>
                  )}
                  decimalScale={2}
                  value={total}
                  displayType={"text"}
                  thousandSeparator={true}
                />
                <button disabled={processing || disabled || succeeded} className={styles.btn}>
                  <span>{processing ? <p>Processing</p> : <p>Buy Now</p>}</span>
                </button>
              </div>
              {/* Error checking */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
