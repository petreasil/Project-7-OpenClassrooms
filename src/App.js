import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import Place from "./components/Place";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Header />
            <Route exact path="/" component={Main} />
            <Route path="/:place_id" component={Place} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
