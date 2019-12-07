import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { Provider } from "react-redux";
import { IntlProvider } from "react-intl";
import LocaleData from "./locale/en-US";
import App from "./App/App";
import configureStore from "./store/config";
import initialState from "./store/initialState";
import "./stylesheets/index.css";

const store = configureStore(initialState);
const renderApp = () => (
  <IntlProvider locale="en" messages={LocaleData}>
    <Provider store={store}>
      <AppContainer>
        <App />
      </AppContainer>
    </Provider>
  </IntlProvider>
);

function runOnLoaded() {
  React.render(renderApp(), document.getElementById("root"));
}

const loadedStates = ["complete", "loaded", "interactive"];

if (loadedStates.includes(document.readyState) && document.body) {
  runOnLoaded();
} else {
  window.addEventListener("DOMContentLoaded", runOnLoaded, false);
}
