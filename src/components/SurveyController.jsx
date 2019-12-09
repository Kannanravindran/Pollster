import React, { Component } from "react";
import Login from "./Login";
import { Container, Row, Col } from "react-bootstrap";
import Survey from "./forms/Survey";
import SurveyList from "./forms/SurveyList";
import axios from "axios";

var surveyData = require("../data/surveyData.json");
var config = require("../config.json");

class SurveyController extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      uid: "",
      answers: {},
      isLoggedIn: null,
      isSubmitted: false,
      surveyId: ""
    };
  }

  validateAccessCode = accessCode => {
    console.log(accessCode);
    axios
      .get("http://127.0.0.1:5000/api/access/?code=" + accessCode)
      .then(res => {
        console.log(res.data.isAuthenticated);
        const isAuthenticated = res.data.isAuthenticated;
        if (isAuthenticated) {
          this.setState({ uid: accessCode, isLoggedIn: true });
        } else {
          this.setState({ isLoggedIn: false });
        }
      });
  };

  handleSaveDraft = e => {
    axios
      .post("http://127.0.0.1:5000/api/save_draft/", {
        uid: this.state.uid,
        answers: this.state.answers
      })
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
    this.setState({ surveyId: "" });
    e.preventDefault();
  };

  componentDidMount = () => {
    this.validateAccessCode(this.props.accessCode);
  };

  handleLogout = () => {
    this.setState({ isLoggedIn: false, uid: "" });
  };

  handleSurveySelect = e => {
    var surveyid = e.target.getAttribute("surveyid");
    this.setState({ surveyId: surveyid });
  };

  updateAnswers = e => {
    var answers = this.state.answers;
    var value = e.target.value;
    var question = e.target.getAttribute("data-question");
    var survey = e.target.getAttribute("data-survey");
    if (!(survey in answers)) {
      answers[survey] = {};
    }
    answers[survey][question] = value;
    this.setState({ answers });
  };

  handleRangeSelect = e => {
    this.updateAnswers(e);
  };

  handleRadioInput = e => {
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
    this.updateAnswers(e);
  };

  handleLogin = (email, password) => {
    var bodyFormData = new FormData();
    bodyFormData.set("emailId", email);
    bodyFormData.set("password", password);
    axios({
      method: "post",
      url: baseurl + "login/",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" }
    })
      .then(function(response) {
        this.setState({ email, isLoggedIn: true });
        console.log(response);
      })
      .catch(function(response) {
        console.log(response);
      });
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
      if (this.state.surveyId !== "") {
        currentDisplay = (
          <Container>
            <Survey
              handleOnClick={this.handleRadioInput}
              handleOnRange={this.handleRangeSelect}
              handleSaveDraft={this.handleSaveDraft}
              surveyData={surveyData[this.state.surveyId]}
            />
          </Container>
        );
      } else {
        currentDisplay = (
          <Container>
            <SurveyList
              isSubmitted={this.state.isSubmitted}
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
