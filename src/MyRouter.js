import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import App from "./App";
import LaunchPage from "./LaunchPage";

class MyRouter extends Component {
  render() {
    return (
      <Router>
        <div>
          <div className="header">
            <Link to="/">Launches</Link>
          </div>
          <Route exact path="/" component={App} />
          <Route path="/launch/:id" component={LaunchPage} />
        </div>
      </Router>
    );
  }
}
export default MyRouter;
