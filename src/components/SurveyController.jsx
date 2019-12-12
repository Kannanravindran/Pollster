import React, { Component } from "react";
import Login from "./Login";
import { Container, Row, Col } from "react-bootstrap";
import Survey from "./subComponents/Survey";
import SurveyList from "./subComponents/SurveyList";
import InviteUser from "./subComponents/InviteUser";
import axios from "axios";

var surveyData = require("../data/surveyData.json");
var config = require("../config.json");

class SurveyController extends Component {
  constructor(props) {
    super(props);
    //
    this.state = {
      email: "",
      password: "",
      uid: "",
      role: "",
      answers: {},
      isLoggedIn: null,
      surveyId: "",
      isSubmitted: false,
      inviteUserToggle: true
    };
  }

  validateAccessCode = async accessCode => {
    // console.log("validation: ", accessCode);
    var handleLogin = this.handleLogin;
    await axios
      .get(config.baseurl + "access/?code=" + accessCode)
      .then(res => {
        console.log(res.data);
        handleLogin(
          res.data.isAuthenticated,
          res.data.uid,
          "invalid access code"
        );
      })
      .catch(err => {
        console.error("error occured here ", err);
      });
  };

  validateCredentials = async (email, password) => {
    var bodyFormData = new FormData();
    var handleLogin = this.handleLogin;
    bodyFormData.set("email", email);
    bodyFormData.set("password", password);
    await axios({
      method: "post",
      url: config.baseurl + "login/",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" }
    })
      .then(res => {
        handleLogin(
          res.data.isAuthenticated,
          res.data.uid,
          "invalid credentials"
        );
      })
      .catch(res => {
        console.log(res);
      });
  };

  handleLogin = (isAuthenticated, uid, role, alertMsg) => {
    if (isAuthenticated) {
      this.setState({ uid, role, isLoggedIn: true });
    } else if (uid !== "") {
      alert(alertMsg);
      this.setState({ isLoggedIn: false });
    } else {
      alert(alertMsg);
      this.setState({ isLoggedIn: false });
    }
  };

  handleSaveDraft = async e => {
    await axios
      .post(config.baseurl + "save_draft/", {
        uid: this.state.user.uid,
        answers: this.state.answers
      })
      .catch(res => {
        console.log(res.data);
      });
    this.setState({ surveyId: "" });
    e.preventDefault();
  };

  componentDidMount = () => {
    const accesscode = this.props.accessCode;
    if (accesscode !== "" && !this.state.isLoggedIn) {
      this.validateAccessCode(accesscode);
    } else {
      this.setState({ isLoggedIn: false });
    }
  };

  handleLogout = () => {
    this.setState({ isLoggedIn: false, uid: "" });
  };

  handleSurveySelect = e => {
    var surveyid = e.target.getAttribute("surveyid");
    this.setState({ surveyId: surveyid });
  };

  handleInviteUserToggle = () => {
    this.setState({ inviteUserToggle: true });
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

  render() {
    let currentDisplay = "";

    if (this.state.isLoggedIn === false) {
      currentDisplay = (
        <Login
          validateAccessCode={this.validateAccessCode}
          validateCredentials={this.validateCredentials}
        />
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
      } else if (this.state.inviteUserToggle === true) {
        currentDisplay = (
          <Container>
            <InviteUser
              handleInviteUser={this.handleInviteUser}
              handleLogout={this.handleLogout}
              uid={this.state.uid}
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
              handleInviteUserToggle={this.handleInviteUserToggle}
            />
          </Container>
        );
      }
    }

    return <div>{currentDisplay}</div>;
  }
}

export default SurveyController;
