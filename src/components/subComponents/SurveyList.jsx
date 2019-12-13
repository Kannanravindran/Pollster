import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "../../stylesheets/form.css";

class SurveyList extends React.Component {
  constructor(props) {
    super(props);
  }

  renderAdminComponent = (text, handler) => {
    if (this.props.userRole < 2) {
      return (
        <Row>
          <Col>
            <Button className="btn btn-secondary survey-item" onClick={handler}>
              {text}
            </Button>
          </Col>
        </Row>
      );
    } else {
      return;
    }
  };

  renderSurveyButton = surveyId => {
    return (
      <React.Fragment key={surveyId}>
        <Row>
          <Col>
            <div>
              <Button
                className="btn btn-info survey-item"
                onClick={this.props.handleOnClick}
                surveyid={surveyId}
              >
                {this.props.surveyReference[surveyId]}
              </Button>
            </div>
          </Col>
        </Row>
        <br />
      </React.Fragment>
    );
  };

  displaySelectiveSurveys = () => {
    console.log(this.props.surveyPrivileges);
    return (
      <React.Fragment>
        {this.props.surveyPrivileges.map(survey =>
          this.renderSurveyButton(survey)
        )}
      </React.Fragment>
    );
  };

  render() {
    return (
      <div className="card survey-list">
        <Container>
          <Row>
            <Col>
              <h1>Choose the Survey you wish to take</h1>
            </Col>
          </Row>
          <br />
          {this.displaySelectiveSurveys()}

          {this.renderAdminComponent(
            "Invite user",
            this.props.handleInviteUserNav
          )}
          <br />
          {this.renderAdminComponent(
            "Admin Panel",
            this.props.handleAdminPanelNav
          )}
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

export default SurveyList;
