import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import axios from 'axios';

class Login extends Component {
  constructor(props){
    super(props);

    this.state = { username: "" ,
                   password: ""
                 };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onCancelClick = this.onCancelClick.bind(this);
    this.onSignUpButtonClick = this.onSignUpButtonClick.bind(this);
  }
  componentDidMount() {
    fetch('userInfo.json')
      .then((response) => response.json())
      .then((response) => {
        this.setState((prevState, props) => ({
          users: response.users
        }))
      })
  }
  onFormSubmit(event) {
    event.preventDefault();
    axios.post('http://104.236.28.32/signin', {
      username: this.state.username,
      password: this.state.password
    })
    .then((response) => {
      localStorage.setItem('token', response.data.token);
      this.props.history.push("/vote");
    })
    .catch((err) => {
      alert(err)
    })

  }
  validateUser(username, password){
    // the index of user starts from 0
    return this.state.users.findIndex((user)=> user.email === username && user.password === password) + 1
  }
  onCancelClick(event) {
    this.setState({ username: "",
                    password: ""
                  });
  }
  onSignUpButtonClick() {
    this.props.switchPage();
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <form onSubmit={this.onFormSubmit} className="login-form">
          <div>
            <input
              placeholder="Email"
              value={this.state.username}
              onChange={(event)=>{this.setState({username: event.target.value})}}
              type="text"
            />
          </div>
          <div>
            <input
              placeholder="Password"
              value={this.state.password}
              onChange={(event)=>{this.setState({password: event.target.value})}}
              type="password"
            />
          </div>
          <div className="input-group-btn">
            <input type="submit" className="btn btn-primary" value="Login" />
            <input type="reset" className="btn btn-primary" value="Cancel"/>
            <input type="button" className="btn btn-primary" value="SignUp" onClick={this.onSignUpButtonClick} />
          </div>
        </form>
      </div>
    )
  }
}

export default withRouter(Login);
