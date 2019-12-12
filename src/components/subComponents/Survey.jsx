import React from "react";
import Radio from "./elements/Radio";
import Slider from "./elements/Slider";
import { Container, Row, Col } from "react-bootstrap";
import "../../stylesheets/form.css";

class Survey extends React.Component {
  constructor(props) {
    super(props);
    var surveyData = this.props.surveyData;

    this.state = {
      sliderValue: surveyData["2"]["default"],
      surveyData: surveyData
    };
  }

  handleRangeInput = e => {
    this.setState({ sliderValue: e.target.value });
  };

  render = () => {
    return (
      <form onSubmit={this.props.handleOnSubmit}>
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
                      handleOnClick={this.props.handleOnClick}
                    />
                  </Col>
                  <Col md="6">
                    <Radio
                      question={this.state.surveyData["1"]["qno"]}
                      survey={this.state.surveyData["surveyId"]}
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
                    onChange={this.props.handleOnRange}
                  />
                </div>
              </Col>
            </Row>
          </div>
          <input
            className="submitButton"
            type="submit"
            value="Save"
            onClick={this.props.handleSaveDraft}
          />
        </div>
      </form>
    );
  };
}

export default Survey;
