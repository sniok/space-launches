import React, { Component } from "react";
import { Route, Link, HashRouter } from "react-router-dom";

import LaunchesPage from "./Launches/LaunchesPage";
import RocketPage from "./Rocket/RocketPage";
import LaunchPage from "./Launch/LaunchPage";

class MyRouter extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <div className="header">
            <Link to="/">Space Launches</Link>
          </div>
          <Route exact path="/" component={LaunchesPage} />
          <Route path="/launch/:id" component={LaunchPage} />
          <Route path="/rocket/:id" component={RocketPage} />
        </div>
      </HashRouter>
    );
  }
}
export default MyRouter;
