import React from "react";
import ReactDOM from "react-dom";
import { initialState, reducer } from "./components/Reducer/Reducer";
import { StateProvider } from "./components/StateProvider/StateProvider";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
