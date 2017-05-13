import React, { Component } from "react";
import api from "../apis/LaunchLibrary";
import Launch from "./Launch";

class LaunchesPage extends Component {
  constructor() {
    super();
    this.state = {
      launches: []
    };
  }
  componentDidMount() {
    this.launches();
  }
  async launches() {
    const launches = await api.launches();
    this.setState(launches);
  }
  renderLaunches = () => {
    return this.state.launches.map(launch => (
      <Launch key={launch.id} data={launch} />
    ));
  };
  render() {
    return (
      <div>
        <div className="container">
          {this.renderLaunches()}
          {this.state.launches.length ? "" : "Loading..."}
        </div>
      </div>
    );
  }
}

export default LaunchesPage;
