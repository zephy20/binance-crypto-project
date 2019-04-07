import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import PairComponent from "./components/PairComponent";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home} />

          <Route exact path="/:id" component={PairComponent} />
        </div>
      </Router>
    );
  }
}

export default App;
