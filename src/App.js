import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import './index.css';

// Import Components:
import Navbar from './components/Navbar.js'
import Dashboard from './components/Dashboard.js'
import CreateUser from './components/CreateUser.js'
import CategoryDashboard from './components/CategoryDashboard.js'
import ViewUser from './components/ViewUser.js'
import Footer from './components/Footer.js'

class App extends Component {
  render() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Route exact path='/' component={Dashboard} />
        <Switch>
          <Route exact path='/categories/:id' component={CategoryDashboard} />
          <Route exact path='/categories/:id/createmember' component={CreateUser} />
          <Route exact path='/categories/:id/users/:id' component={ViewUser} />
        </Switch>
      </Router>
      <footer>
        <Footer />
      </footer>
    </div>
  );
  }
}

export default App;
