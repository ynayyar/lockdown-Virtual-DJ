import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import ClientDashboard from "./ClientDashboard";
import Svgdashboard from "./Svgdashboard";

export default class dashboard extends Component {
  constructor(props) {
    super(props);
    const login = localStorage.getItem("loginname");

    let loggedIn = true;
    if (login === "") {
      loggedIn = false;
      localStorage.setItem("loginname", "");
    }
    this.state = {
      loggedIn,
      login,
    };
  }

  render() {
    if (!this.state.loggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <div className="wrapper">
        <header>
          <div className="mainDiv">
            <span>Welcome To Virtual DJ Event</span>
            <div>
              <i style={{ textAlign: "right" }}>{this.state.login}</i>
              <Link to="/">Logout</Link>
            </div>
          </div>
        </header>
        <div className="main">
          <ClientDashboard />
        </div>
        <div className="footer">
          <div className="content">
            <div className="songCategories">
              <span>Copyright &copy; 2020</span>
            </div>
            <div className="songRequestList">
              <span>Project - Designed &amp; Developed By: Yogesh Nayyar</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
