import React from "react";
import ReactDOM from "react-dom";
import "./stylesheets/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App/App";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();