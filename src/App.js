import React, { Component } from "react";
import api from "./Api";
import Launch from "./Launch";

class App extends Component {
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
          <h1>Launches</h1>
          {this.renderLaunches()}
          {this.state.launches.length ? "" : "Loading..."}
        </div>
      </div>
    );
  }
}

export default App;
