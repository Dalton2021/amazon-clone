const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51KXuBMHuqbFtZFIxFF44k5xDza9JghNqTtNcJsABCH9PRyRhPHqL97nIR6abE4eaSO0GhmW6obvKruEjjxUGy6fb00NxVi2QIZ"
);
import { apiGrab } from "../src/axios";

// API

// - App config
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// - API routes
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", apiGrab());

// - Listen command
exports.api = functions.https.onRequest(app);

// Example endpoint
// http://localhost:5001/clone-8b8f0/us-central1/api
