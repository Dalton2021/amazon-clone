import React, { useState, useEffect } from "react";
import styles from "./Orders.module.css";
import { database } from "../../firebase";
import { useStateValue } from "../StateProvider/StateProvider";
import IndivOrder from "./IndivOrder/IndivOrder";
import { Link } from "react-router-dom";

const Orders = () => {
  const [{ user }] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      database
        .collection("users")
        .doc(user?.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) =>
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <div className={styles.order}>
      {user ? (
        <div>
          <h1>Your Orders</h1>
          <div className={styles.ordersContainer}>
            {orders?.map((order) => (
              <IndivOrder order={order}></IndivOrder>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h1>No Orders</h1>
          <p>
            Please
            <span>
              <Link className={styles.link} to="/login">
                {" "}
                sign in{" "}
              </Link>
            </span>
            or
            <span>
              <Link className={styles.link} to="/createAccount">
                {" "}
                create an account{" "}
              </Link>
            </span>
            to view future orders.
          </p>
        </div>
      )}
    </div>
  );
};

export default Orders;
