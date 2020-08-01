import React, { Component } from "react";
import { Redirect } from "react-router-dom";
export default class Login extends Component {
  constructor(props) {
    super(props);
    localStorage.setItem("loginname", "");
    let loggedIn = false;
    this.state = {
      loginname: "",
      loggedIn,
    };
    this.onChange = this.onChange.bind(this);
    this.Login = this.Login.bind(this);
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  Login = (e) => {
    //e.preventDefault();
    const { loginname } = this.state;
    if (loginname !== "") {
      this.setState({
        loggedIn: true,
        loginname: e.target.value,
      });
      localStorage.setItem("loginname", this.state.loginname);
    }
  };

  render() {
    if (this.state.loggedIn) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <div>
        <div class="mainDiv">
          {/* <img src={musicimg} alt style={{ width: 100, height: 100 }} /> */}
          <h1>Virtual DJ session</h1>
          <p>
            <i>Live in Concert</i>
          </p>
          <span>Enter your name</span>
          <input
            type="text"
            name="loginname"
            onChange={this.onChange}
            value={this.state.loginname}
          />
          <div style={{ marginTop: 15 }}>
            <button type="button" className="btn-primary" onClick={this.Login}>
              Let's Play Music
            </button>
          </div>
        </div>
      </div>
    );
  }
}
