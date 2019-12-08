import React, { Component } from "react";
// import logo from './logo.svg';
import "../stylesheets/App.css";
import SurveyController from "../components/SurveyController";

class App extends Component {
  render() {
    return (
      <div className="App">
        <SurveyController />
      </div>
    );
  }
}

export default App;
