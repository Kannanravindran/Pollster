import React from "react";
import Radio from "./elements/Radio";
import Slider from "./elements/Slider";
import { Container, Row, Col } from "react-bootstrap";
import "../../stylesheets/form.css";

class DriveSurvey extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sliderValue: 2 };
  }

  handleRangeInput = e => {
    this.setState({ sliderValue: e.target.value });
  };

  render = () => {
    return (
      <form onSubmit={this.props.handleOnSubmit}>
        <div className="card">
          <h3 className="survey-title">Drive Survey</h3>
          <div className="survey-question">
            <Row>
              <Col md="6">
                <h3>1. Do you like to drive? </h3>
              </Col>
              <Col md="6">
                <Row>
                  <Col md="6">
                    <Radio
                      type="radio"
                      name="answer2"
                      value="Y"
                      text="Yes"
                      handleOnClick={this.props.handleOnClick}
                    />
                  </Col>
                  <Col md="6">
                    <Radio
                      type="radio"
                      name="answer2"
                      value="N"
                      text="No"
                      handleOnClick={this.props.handleOnClick}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <h3>2. How many days do you drive in a week?</h3>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <div className="sliderContainer">
                  <label>
                    <h4>{this.state.sliderValue} / 7</h4>
                  </label>
                  <Slider
                    min="0"
                    max="7"
                    value={this.state.sliderValue}
                    id="customRange2"
                    onInput={this.handleRangeInput}
                  />
                </div>
              </Col>
            </Row>
          </div>
          <input className="submitButton" type="submit" value="Save" />
        </div>
      </form>
    );
  };
}

export default DriveSurvey;
