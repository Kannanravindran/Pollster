import React from "react";
import ReactDOM from "react-dom";
import "./stylesheets/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App/App";
import registerServiceWorker from "./registerServiceWorker";

const searchParams = new URLSearchParams(window.location.search);
const accessCode = searchParams.get("code") || "";

ReactDOM.render(
  <App accessCode={accessCode} />,
  document.getElementById("root")
);
registerServiceWorker();
