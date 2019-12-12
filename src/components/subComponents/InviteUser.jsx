import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "../../stylesheets/form.css";
import axios from "axios";
var config = require("../../config.json");

class InviteUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = { toastMsg: "", surveyids: [] };
  }

  handleCheckboxSelect = e => {
    let surveyids = this.state.surveyids;
    const newSurveyid = e.target.value;
    if (surveyids.includes(newSurveyid)) {
      surveyids.splice(surveyids.indexOf(newSurveyid), 1);
    } else {
      surveyids.push(newSurveyid);
    }
    this.setState({ surveyids });
  };

  handleInviteData = e => {
    let toastMsg = "";
    if (this.state.surveyids.length > 0) {
      const email = this.refs.email.value;
      let inviteData = this.state;
      inviteData.email = email;
      inviteData.ref = this.props.uid;
      axios.post(config.baseurl + "register/", inviteData).then(res => {
        console.log(res.data);
      });
      this.setState({ toastMsg, surveyids: [] });
      e.target.reset();
    } else {
      toastMsg = "select at least one survey";
    }
    e.preventDefault();
  };

  render() {
    return (
      <div className="card survey-list">
        <Container>
          <Row>
            <Col>
              <h1>Enter the email id of the feedback user</h1>
            </Col>
          </Row>
          <br />
          <form onSubmit={this.handleInviteData}>
            <Row>
              <Col>
                <input
                  className="nameInput"
                  type="email"
                  placeholder="Email Id"
                  autoFocus={true}
                  ref="email"
                  required
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <span>{this.state.toastMsg}</span>
              </Col>
            </Row>
            <br />
            <Row className="justify-content-md-center">
              <Col md="3">
                <Row>
                  <label>
                    <input
                      type="checkbox"
                      name="surveySelect"
                      value="1"
                      onClick={this.handleCheckboxSelect}
                    />{" "}
                    Guacamole Survey
                  </label>
                </Row>
                <Row>
                  <label>
                    <input
                      type="checkbox"
                      name="surveySelect"
                      value="2"
                      onClick={this.handleCheckboxSelect}
                    />{" "}
                    Drive Survey
                  </label>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col>
                <input
                  type="submit"
                  className="btn btn-secondary survey-item"
                  value="Invite User"
                />
              </Col>
            </Row>
          </form>
          <br />
          <Row>
            <Col>
              <Button
                className="btn btn-dark survey-item"
                onClick={this.props.handleLogout}
              >
                Logout
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default InviteUser;
