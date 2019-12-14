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
              <th>Liking</th>
              <th>Frequency</th>
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
          <Tab disabled={this.activateTab("1")}>Guacamole</Tab>
          <Tab disabled={this.activateTab("2")}>Driving</Tab>
        </TabList>
        <TabPanel>{this.getResponseTable("1")}</TabPanel>
        <TabPanel>{this.getResponseTable("2")}</TabPanel>
      </Tabs>
    );
  }
}

export default SurveyAdminPanel;
