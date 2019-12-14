import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Table from "react-bootstrap/Table";
import axios from "axios";
import SurveyAdminPanel from "./subComponents/SurveyAdminPanel";
import StatsAdminPanel from "./subComponents/StatsAdminPanel";

var config = require("../config.json");

class AdminPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {};

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
      <div className="card">
        <Tabs>
          <TabList>
            <Tab>Response</Tab>
            <Tab>Stats</Tab>
          </TabList>
          <TabPanel>
            <SurveyAdminPanel
              uid={this.props.uid}
              adminPrivileges={this.props.adminPrivileges}
            />
          </TabPanel>
          <TabPanel>
            <StatsAdminPanel
              uid={this.props.uid}
              adminPrivileges={this.props.adminPrivileges}
            />
          </TabPanel>
        </Tabs>
        <input
          className="submitButton"
          style={{ position: "absolute", right: "0", bottom: "0" }}
          type="button"
          value="Exit"
          onClick={this.props.resetSurveyList}
        />
      </div>
    );
  }
}

export default AdminPanel;
