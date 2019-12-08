import React, { Component } from "react";
// import logo from './logo.svg';
import "../stylesheets/App.css";
import SurveyController from "../components/SurveyController";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <SurveyController access={this.props.access} />
      </div>
    );
  }
}

export default App;
