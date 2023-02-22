import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import SomeContextProvider from "./SomeContext";

ReactDOM.render(
  <SomeContextProvider>
    <App />
  </SomeContextProvider>,
  document.getElementById("root")
);
