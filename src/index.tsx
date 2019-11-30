import "normalize.css";

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import ReactGA from "react-ga";
ReactGA.initialize("UA-153638553-1", {
  gaOptions: { cookieDomain: "none" },
  debug: true
});

import { App } from "./components/App";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
