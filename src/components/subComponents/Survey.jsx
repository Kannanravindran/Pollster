import React from "react";
import Radio from "./elements/Radio";
import Slider from "./elements/Slider";
import { Container, Row, Col } from "react-bootstrap";
import "../../stylesheets/form.css";
import axios from "axios";

const config = require("../../config.json");

class Survey extends React.Component {
  constructor(props) {
    super(props);
    var surveyData = this.props.surveyData;

    this.state = {
      sliderValue: surveyData["2"]["default"],
      surveyData: surveyData,
      answers: {}
    };
  }

  getResponseData = () => {
    axios
      .get(
        config.baseurl +
          "get-response/?uid=" +
          this.props.uid +
          "&surveyid=" +
          this.state.surveyData["surveyId"]
      )
      .then(res => {
        console.log(res.data);
        if (res.data.success) {
          // loading the stored data
          this.setState({ answers: res.data });
          var radios = Array.from(
            document.querySelectorAll('input[type="radio"]')
          );
          radios.forEach(radio => {
            if (radio.value == this.state.answers["1"]) {
              radio.parentNode.classList.add("label-checked");
            }
          });
          this.setState({ sliderValue: this.state.answers["2"] });
        }
      });
  };

  componentDidMount = () => {
    this.getResponseData();
  };

  handleOnSubmit = e => {
    const isSubmitted = true
      ? e.target.getAttribute("data-action") === "submit"
      : false;
    var answers = this.state.answers;
    answers.isSubmitted = isSubmitted;
    this.props.handleSurveySubmission(answers);
  };

  updateAnswers = e => {
    var answers = this.state.answers;
    var value = e.target.value;
    var question = e.target.getAttribute("data-question");
    // var survey = e.target.getAttribute("data-survey");
    var surveyId = this.state.surveyData["surveyId"];
    answers[question] = value;
    answers.surveyId = surveyId;
    this.setState({ answers });
    console.log(this.state);
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

  handleRangeInput = e => {
    this.setState({ sliderValue: e.target.value });
  };

  render = () => {
    return (
      <form>
        <div className="card">
          <h3 className="survey-title">{this.state.surveyData["title"]}</h3>
          <div className="survey-question">
            <Row>
              <Col md="6">
                <h3>1. {this.state.surveyData["1"]["question"]} </h3>
              </Col>
              <Col md="6">
                <Row>
                  <Col md="6">
                    <Radio
                      name={"question" + this.state.surveyData["1"]["qno"]}
                      question={this.state.surveyData["1"]["qno"]}
                      survey={this.state.surveyData["surveyId"]}
                      value="Y"
                      text="Yes"
                      handleOnClick={this.handleRadioInput}
                      disabled={this.state.answers.isSubmitted}
                    />
                  </Col>
                  <Col md="6">
                    <Radio
                      name={"question" + this.state.surveyData["1"]["qno"]}
                      question={this.state.surveyData["1"]["qno"]}
                      survey={this.state.surveyData["surveyId"]}
                      value="N"
                      text="No"
                      handleOnClick={this.handleRadioInput}
                      disabled={this.state.answers.isSubmitted}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <h3>2. {this.state.surveyData["2"]["question"]}</h3>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <div className="sliderContainer">
                  <label>
                    <h4>
                      {this.state.sliderValue} /{" "}
                      {this.state.surveyData["2"]["max"]}
                    </h4>
                  </label>
                  <Slider
                    min={this.state.surveyData["2"]["min"]}
                    max={this.state.surveyData["2"]["max"]}
                    defaultvalue={this.state.sliderValue}
                    id="question2"
                    question={this.state.surveyData["2"]["qno"]}
                    survey={this.state.surveyData["surveyId"]}
                    onInput={this.handleRangeInput}
                    onChange={this.handleRangeSelect}
                    disabled={this.state.answers.isSubmitted}
                  />
                </div>
              </Col>
            </Row>
          </div>
          <Row>
            <Col>
              <input
                className="submitButton"
                type="button"
                value="Submit"
                data-action="submit"
                onClick={this.handleOnSubmit}
                disabled={this.state.answers.isSubmitted}
              />
            </Col>
            <Col>
              <input
                className="submitButton"
                type="button"
                value="Save and Exit"
                data-action="save"
                onClick={this.handleOnSubmit}
                disabled={this.state.answers.isSubmitted}
              />
            </Col>
            <Col>
              <input
                className="submitButton"
                type="button"
                value="Exit"
                onClick={this.props.resetSurveyList}
              />
            </Col>
          </Row>
        </div>
      </form>
    );
  };
}

export default Survey;
