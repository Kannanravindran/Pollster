import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "../../stylesheets/form.css";

class InviteUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = { toastMsg: "" };
  }

  handleInviteData = e => {
    const email = this.refs.email.value;
    const toastMsg = email + " has been invited";
    this.setState({ toastMsg: toastMsg });
    this.props.handleInviteUser(email);
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
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <span>{this.state.toastMsg}</span>
              </Col>
            </Row>
            <br />
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
