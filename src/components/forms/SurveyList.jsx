import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "../../stylesheets/form.css";

class SurveyList extends React.Component {
  constructor(props) {
    super(props);
  }

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
          <Row>
            <Col>
              <div>
                <Button
                  className="btn btn-info survey-item"
                  onClick={this.props.handleOnClick}
                  surveyid="1"
                >
                  Guacamole Survey
                </Button>
              </div>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <Button
                className="btn btn-info survey-item"
                onClick={this.props.handleOnClick}
                surveyid="2"
              >
                Driving Survey
              </Button>
            </Col>
          </Row>
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

export default SurveyList;
