import React, { Component } from "react";

class Login extends Component {
  constructor(props) {
    super(props);
  }

  handleCredentialSubmit = e => {
    const email = this.refs.email.value;
    const password = this.refs.password.value;

    if (password !== "" && email !== "") {
      this.props.validateCredentials(email, password);
    } else {
      alert("enter email id and password");
    }
    e.preventDefault();
  };

  handleAccessSubmit = e => {
    const accessCode = this.refs.access.value;
    this.props.validateAccessCode(accessCode);
    e.preventDefault();
  };

  render() {
    return (
      <div>
        <h1> Unmatched Survey</h1>
        <div className="login-tab">
          <h3>Login with credentials</h3>
          <div className="tab-content">
            <form onSubmit={this.handleCredentialSubmit}>
              <input
                className="nameInput"
                type="email"
                placeholder="Email Id"
                autoFocus={true}
                ref="email"
              />
              <br />
              <input
                className="nameInput"
                type="password"
                placeholder="Password"
                ref="password"
              />
              <br />
              <input className="login-button" type="submit" value="Login" />
            </form>
          </div>
          <div className="tab-content">
            <p className="large-txt">OR</p>
            <h3>Login using Access Code</h3>
            <form onSubmit={this.handleAccessSubmit}>
              <input
                className="nameInput"
                type="text"
                placeholder="Enter access code"
                ref="access"
              />
              <br />
              <input className="login-button" type="submit" value="Continue" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
