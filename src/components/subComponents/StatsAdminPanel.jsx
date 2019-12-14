import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Table from "react-bootstrap/Table";
import axios from "axios";

// var CanvasJSReact = require("../../canvas/canvasjs.react");
import CanvasJSReact from "../../canvas/canvasjs.react";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var config = require("../../config.json");

class StatsAdminPanel extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = { data: {} };
  }

  storeAnswers = surveyId => {
    axios
      .get(config.baseurl + "stats/", {
        params: {
          uid: this.props.uid
        }
      })
      .then(res => {
        var data = res.data.stat;
        this.setState({ data });
        // console.log(this.state);
      });
  };

  componentDidMount = () => {
    this._isMounted = true;
    this.props.adminPrivileges.forEach(survey => {
      this.storeAnswers(survey);
    });
  };
  componentWillUnmount = () => {
    this._isMounted = false;
  };
  activateTab = e => {
    return !this.props.adminPrivileges.includes(e);
  };

  getStateData = (n, r) => {
    if (this.state.data[n] === undefined) {
      return 0;
    } else {
      return this.state.data[n][r];
    }
  };

  getStatistics = surveyId => {
    console.log("table");
    if (this.state.data[surveyId] !== undefined) {
      console.log("table");
      return (
        <Table hover>
          <thead>
            <tr>
              <th>Property</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td># Users</td>
              <td>{this.state.data[surveyId]["user_count"]}</td>
            </tr>
            <tr>
              <td>Average</td>
              <td>{this.state.data[surveyId]["avg"]}</td>
            </tr>
            <tr>
              <td>Median</td>
              <td>{this.state.data[surveyId]["median"]}</td>
            </tr>
          </tbody>
        </Table>
      );
    }
  };
  getDonutChart = surveyId => {
    console.log("state: ", this.state);
    const options = {
      animationEnabled: true,
      title: {
        text: "Customer Satisfaction"
      },
      subtitles: [
        {
          text: "% Positive",
          verticalAlign: "center",
          fontSize: 24,
          dockInsidePlotArea: true
        }
      ],
      data: [
        {
          type: "doughnut",
          showInLegend: true,
          indexLabel: "{name}: {y}",
          yValueFormatString: "#,###'%'",
          dataPoints: [
            { name: "Like", y: this.getStateData(surveyId, "Y") },
            { name: "Dislike", y: this.getStateData(surveyId, "N") }
          ]
        }
      ]
    };
    return <CanvasJSChart options={options} />;
  };

  render() {
    return (
      <Tabs>
        <TabList>
          <Tab disabled={this.activateTab("1")}>Guacamole</Tab>
          <Tab disabled={this.activateTab("2")}>Driving</Tab>
        </TabList>
        <TabPanel>
          <Container>
            <Row>
              <Col>{this.getStatistics("1")}</Col>
              <Col>{this.getDonutChart("1")}</Col>
            </Row>
          </Container>
        </TabPanel>
        <TabPanel>
          <Container>
            <Row>
              <Col>{this.getStatistics("2")}</Col>
              <Col>{this.getDonutChart("2")}</Col>
            </Row>
          </Container>
        </TabPanel>
      </Tabs>
    );
  }
}

export default StatsAdminPanel;
