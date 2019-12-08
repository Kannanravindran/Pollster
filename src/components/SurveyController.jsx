import React, { Component } from "react";
import Login from "./Login";
import { Container, Row, Col } from "react-bootstrap";
import GuacSurvey from "./forms/Guac";
import DriveSurvey from "./forms/Drive";
import SurveyList from "./forms/SurveyList";

var uuid = require("uuid");

class SurveyController extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      uid: this.props.access,
      answers: {},
      isLoggedIn: false,
      isSubmitted: false,
      surveyId: ""
    };
  }

  componentDidMount = () => {
    if (this.state.uid !== "") {
      this.setState({ isLoggedIn: true });
    }
  };

  getParams = location => {
    const searchParams = new URLSearchParams(location.search);
    return {
      query: searchParams.get("access") || ""
    };
  };

  handleLogout = () => {
    this.setState({ isLoggedIn: false, userid: "" });
  };
  handleSurveySelect = e => {
    var surveyid = e.target.getAttribute("surveyid");

    console.log("here ", e.target);
    this.setState({ surveyId: surveyid });
  };

  handleSurveySubmit = e => {
    // firebase.database().ref('Csurvey/'+ this.state.uid).set({
    //     Username: this.state.Username,
    //     email: this.state.email,
    //     Answers: this.state.answers
    // });
    this.setState({ isSubmitted: true, surveyId: "" });
    e.preventDefault();
  };

  answerSelected = e => {
    if (e.target.checked) {
      e.target.parentNode.classList.add("label-checked");
    }
    var radios = Array.from(document.querySelectorAll('input[type="radio"]'));
    radios.forEach(radio => {
      if (radio.checked) {
        radio.parentNode.classList.add("label-checked");
      } else {
        radio.parentNode.classList.remove("label-checked");
      }
    });
    var answers = this.state.answers;
    var value = e.target.value;
    var name = e.target.name;
    answers[name] = value;
    this.setState({ answers });
    console.log(this.state);
  };

  changeUsername = (Username, email) => {
    this.setState({ Username, email, isLoggedIn: true });
    console.log(Username, email);
  };

  logUser = (user, Username, email) => {
    this.setState({ user, Username, email, isLoggedIn: true });
    console.log(user, Username, email);
  };

  render() {
    let currentDisplay = "";

    if (this.state.isLoggedIn === false) {
      currentDisplay = (
        <Login logUser={this.logUser} changeUsername={this.changeUsername} />
      );
    } else if (
      this.state.isLoggedIn === true
      // && this.state.isSubmitted === false
    ) {
      if (this.state.surveyId === "1") {
        currentDisplay = (
          <Container>
            <GuacSurvey
              handleOnClick={this.answerSelected}
              handleOnSubmit={this.handleSurveySubmit}
            />
          </Container>
        );
      } else if (this.state.surveyId === "2") {
        currentDisplay = (
          <Container>
            <DriveSurvey
              handleOnClick={this.answerSelected}
              handleOnSubmit={this.handleSurveySubmit}
            />
          </Container>
        );
      } else {
        currentDisplay = (
          <Container>
            <SurveyList
              handleOnClick={this.handleSurveySelect}
              handleLogout={this.handleLogout}
            />
          </Container>
        );
      }
      // } else if (this.state.isSubmitted === true) {
      //   currentDisplay = (
      //     <div>
      //       <h2>Thanks for taking this survey, {this.state.Username}</h2>
      //     </div>
      //   );
    }

    return <div>{currentDisplay}</div>;
  }
}

export default SurveyController;
