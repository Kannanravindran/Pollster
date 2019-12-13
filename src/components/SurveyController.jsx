import React, { Component } from "react";
import Login from "./Login";
import { Container, Row, Col } from "react-bootstrap";
import Survey from "./subComponents/Survey";
import SurveyList from "./subComponents/SurveyList";
import InviteUser from "./subComponents/InviteUser";
import AdminPanel from "./AdminPanel";
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
      role: "",
      isLoggedIn: null,
      selectedSurveyId: "",
      isSubmitted: false,
      inviteUserNav: false,
      adminPanelNav: false
    };
  }
  // operations done on page load
  componentDidMount = () => {
    const accesscode = this.props.accessCode;
    if (accesscode !== "" && !this.state.isLoggedIn) {
      this.validateAccessCode(accesscode);
    } else {
      this.setState({ isLoggedIn: false });
    }
  };

  // Multiple methods to authenticate the user
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
          res.data.role,
          res.data.surveyPrivileges,
          res.data.adminPrivileges,
          "invalid access code"
        );
      })
      .catch(err => {
        console.error("error occured here ", err);
        this.setState({ isLoggedIn: false });
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
          res.data.role,
          res.data.surveyPrivileges,
          res.data.adminPrivileges,
          "invalid credentials"
        );
      })
      .catch(res => {
        console.log(res);
        this.setState({ isLoggedIn: false });
      });
  };

  // methods that handle login and logout
  handleLogin = (
    isAuthenticated,
    uid,
    role,
    surveyPrivileges,
    adminPrivileges,
    alertMsg
  ) => {
    if (isAuthenticated) {
      this.setState({
        uid,
        role,
        surveyPrivileges,
        adminPrivileges,
        isLoggedIn: true
      });
    } else if (uid !== "") {
      alert(alertMsg);
      this.setState({ isLoggedIn: false });
    } else {
      alert(alertMsg);
      this.setState({ isLoggedIn: false });
    }
  };

  handleLogout = () => {
    this.setState({ isLoggedIn: false, uid: "" });
  };

  // method that handles survey response submission
  handleSurveySubmission = answers => {
    console.log("answers: ", answers);
    answers.uid = this.state.uid;
    axios.post(config.baseurl + "store-survey/", answers).catch(res => {
      console.log(res.data);
    });
    this.setState({ selectedSurveyId: "" });
  };

  resetSurveyList = () => {
    this.setState({
      selectedSurveyId: "",
      inviteUserNav: false,
      superAdminNav: false
    });
  };

  // page selection methods
  handleSurveySelect = e => {
    var selectedSurveyId = e.target.getAttribute("surveyid");
    this.setState({ selectedSurveyId: selectedSurveyId });
  };

  handleInviteUserNav = () => {
    console.log(this.state);
    this.setState({ inviteUserNav: true });
  };

  handleAdminPanelNav = () => {
    this.setState({ adminPanelNav: true });
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
      if (this.state.selectedSurveyId !== "") {
        currentDisplay = (
          <Container>
            <Survey
              handleSurveySubmission={this.handleSurveySubmission}
              surveyData={surveyData[this.state.selectedSurveyId]}
              uid={this.state.uid}
              resetSurveyList={this.resetSurveyList}
            />
          </Container>
        );
      } else if (this.state.inviteUserNav === true && this.state.role < 2) {
        currentDisplay = (
          <Container>
            <InviteUser
              handleInviteUser={this.handleInviteUser}
              handleLogout={this.handleLogout}
              uid={this.state.uid}
              resetSurveyList={this.resetSurveyList}
              adminPrivileges={this.state.adminPrivileges}
            />
          </Container>
        );
      } else if (this.state.adminPanelNav === true && this.state.role < 2) {
        currentDisplay = (
          <Container>
            <AdminPanel
              uid={this.state.uid}
              resetSurveyList={this.resetSurveyList}
            />
          </Container>
        );
      } else {
        currentDisplay = (
          <Container>
            <SurveyList
              isSubmitted={this.state.isSubmitted}
              userRole={this.state.role}
              handleOnClick={this.handleSurveySelect}
              handleLogout={this.handleLogout}
              handleInviteUserNav={this.handleInviteUserNav}
              handleAdminPanelNav={this.handleAdminPanelNav}
              surveyPrivileges={this.state.surveyPrivileges}
              surveyReference={config.surveyReference}
            />
          </Container>
        );
      }
    }

    return <div>{currentDisplay}</div>;
  }
}

export default SurveyController;
