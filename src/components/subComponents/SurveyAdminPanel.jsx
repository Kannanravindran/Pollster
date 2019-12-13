import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Table from "react-bootstrap/Table";
import axios from "axios";

var config = require("../../config.json");

class SurveyAdminPanel extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {};
  }

  storeAnswers = surveyId => {
    axios
      .get(config.baseurl + "admin/get-all-response/", {
        params: {
          uid: this.props.uid,
          surveyid: surveyId
        }
      })
      .then(res => {
        var data = res.data.answers;
        console.log(data);
        this.setState({ [surveyId]: data });
        console.log(this.state);
      });
  };

  componentDidMount = () => {
    this._isMounted = true;
    this.storeAnswers("1");
    this.storeAnswers("2");
  };
  componentWillUnmount = () => {
    this._isMounted = false;
  };

  generateRows = entry => {
    return (
      <React.Fragment key={Math.random()}>
        <tr>
          <td>{entry.email}</td>
          <td>{entry["1"]}</td>
          <td>{entry["2"]}</td>
        </tr>
      </React.Fragment>
    );
  };

  getResponseTable = surveyId => {
    if (this.state[surveyId] !== undefined) {
      return (
        <Table hover>
          <thead>
            <tr>
              <th>Email</th>
              <th>Question 1</th>
              <th>Question 2</th>
            </tr>
          </thead>
          <tbody>
            {this.state[surveyId].map(entry => this.generateRows(entry))}
          </tbody>
        </Table>
      );
    }
  };

  render() {
    return (
      
        <Tabs>
          <TabList>
            <Tab>Guacamole</Tab>
            <Tab>Driving</Tab>
          </TabList>
          <TabPanel>{this.getResponseTable("1")}</TabPanel>
          <TabPanel>{this.getResponseTable("2")}</TabPanel>
        </Tabs>
    );
  }
}

export default SurveyAdminPanel;
