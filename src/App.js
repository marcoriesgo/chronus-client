import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';

// Import Components:
import Navbar from './components/Navbar.js'
import Dashboard from './components/Dashboard.js'
import CreateUser from './components/CreateUser.js'
import CategoryDashboard from './components/CategoryDashboard.js'


class App extends Component {
  render() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Route exact path='/' component={Dashboard} />
        <Route exact path='/createmember' component={CreateUser} />
        <Switch>
          <Route exact path='/categories/:id' component={CategoryDashboard} />
        </Switch>
      </Router>

    </div>
  );
  }
}

export default App;
