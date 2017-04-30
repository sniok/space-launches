import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import App from "./App";

class MyRouter extends Component {
  render() {
    return (
      <Router>
        <div>
          <div className="header">
            <Link to="/">Launches</Link>
          </div>
          <Route path="/" component={App} />
        </div>
      </Router>
    );
  }
}
export default MyRouter;
