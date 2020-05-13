import React, { Component } from "react";

class Navbar extends Component {
    render() {
      return (
        <div className="navbar-fixed">
          <nav className="z-depth-0">
            <div className="logo-container">
                <a href="/">
                <img src="logo.png" alt="Chronos" id="logo"></img>
                </a>
            </div>
          </nav>
        </div>
      );
    }
  }



export default Navbar;