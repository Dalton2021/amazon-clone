import axios from "axios";
const stripe = require("stripe")(
  "sk_test_51KXuBMHuqbFtZFIxFF44k5xDza9JghNqTtNcJsABCH9PRyRhPHqL97nIR6abE4eaSO0GhmW6obvKruEjjxUGy6fb00NxVi2QIZ"
);

const instance = axios.create({
  baseURL: "http://localhost:5001/clone-8b8f0/us-central1/api",
});

export { instance };

const apiGrab = async (response, request) => {
  const total = request.query.total;

  console.log("Payment Request Recieved BOOM!!! for this amount >>> ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "usd",
  });

  // OK - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
};

export { apiGrab };
