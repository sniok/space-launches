import React, { Component } from "react";
import { Route, Link, HashRouter } from "react-router-dom";

import App from "./App";
import LaunchPage from "./LaunchPage";

class MyRouter extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <div className="header">
            <Link to="/">Launches</Link>
          </div>
          <Route exact path="/" component={App} />
          <Route path="/launch/:id" component={LaunchPage} />
        </div>
      </HashRouter>
    );
  }
}
export default MyRouter;
