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

  adminRightsCheck = e => {
    const hasRights = this.props.adminPrivileges.includes(e);
    return !hasRights;
  };

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

  handleInviteData = async e => {
    var toastMsg = "";
    if (this.state.surveyids.length > 0) {
      const email = this.refs.email.value;
      let inviteData = this.state;
      inviteData.email = email;
      inviteData.ref = this.props.uid;
      axios.post(config.baseurl + "register/", inviteData).then(res => {
        console.log(res.data);
        if (res.data.isInvited) {
          toastMsg = email + " has been invited";
          this.setState({ toastMsg, surveyids: [] });
        } else {
          toastMsg = "error inviting " + email;
          this.setState({ toastMsg });
        }
      });
      e.target.reset();
    } else {
      toastMsg = "select at least one survey";
      this.setState({ toastMsg, surveyids: [] });
    }
    setTimeout(() => {
      this.setState({ toastMsg: "" });
    }, 5000);
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
                      disabled={this.adminRightsCheck("1")}
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
                      disabled={this.adminRightsCheck("2")}
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
              <input
                className="btn btn-outline-secondary survey-item"
                type="button"
                value="Exit"
                onClick={this.props.resetSurveyList}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <Button
                className="btn btn-outline-danger survey-item transparent"
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
