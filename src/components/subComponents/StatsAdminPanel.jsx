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
  //   _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {};
  }

  activateTab = e => {
    return !this.props.adminPrivileges.includes(e);
  };

  getBarChart = surveyId => {
    const options = {
      animationEnabled: true,
      exportEnabled: false,
      theme: "light2", //"light1", "dark1", "dark2"
      title: {
        text: "Simple Column Chart with Index Labels"
      },
      data: [
        {
          type: "column", //change type to bar, line, area, pie, etc
          //indexLabel: "{y}", //Shows y value on all Data Points
          indexLabelFontColor: "#5A5757",
          indexLabelPlacement: "outside",
          dataPoints: [
            { x: 10, y: 71 },
            { x: 20, y: 55 },
            { x: 30, y: 50 },
            { x: 40, y: 65 },
            { x: 50, y: 71 },
            { x: 60, y: 68 },
            { x: 70, y: 38 },
            { x: 80, y: 92, indexLabel: "Highest" },
            { x: 90, y: 54 },
            { x: 100, y: 60 },
            { x: 110, y: 21 },
            { x: 120, y: 49 },
            { x: 130, y: 36 }
          ]
        }
      ]
    };

    return <CanvasJSChart options={options} />;
  };

  getDonutChart = surveyId => {
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
            { name: "Like", y: 60 },
            { name: "Dislike", y: 40 }
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
              <Col>{this.getDonutChart("1")}</Col>
              <Col>{this.getBarChart("1")}</Col>
            </Row>
          </Container>
        </TabPanel>
        <TabPanel>
          <Container>
            <Row>
              <Col>{this.getDonutChart("2")}</Col>
              <Col>{this.getBarChart("2")}</Col>
            </Row>
          </Container>
        </TabPanel>
      </Tabs>
    );
  }
}

export default StatsAdminPanel;
