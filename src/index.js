import React from "react";
import ReactDOM from "react-dom";
import "./stylesheets/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App/App";
import registerServiceWorker from "./registerServiceWorker";

const searchParams = new URLSearchParams(window.location.search);
const access = searchParams.get("access") || "";

ReactDOM.render(<App access={access} />, document.getElementById("root"));
registerServiceWorker();
