/*//login form
 - return a token and save to local storage 
 - set up isLoading state in Login and show spinner or in buttonwhile request is happening
 - when request returns, save to localstorage
 - use history object in login component to navigate user to FriendsList route
 -create protected route

*/
//login route

import React from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      credentials: {
        username: "",
        password: "",
      },
    };
  }

  handleChange = (e) => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value,
      },
    });
    console.log(this.state.credentials);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ ...this.state, isLoading: true });

    axiosWithAuth()
      .post("/api/login", this.state.credentials)
      .then((res) => {
        //Give localStorage the token
        window.localStorage.setItem("token", res.data.payload);
        this.setState({ ...this.state, isLoading: false });
        //Send logged in user to protected page
        this.props.history.push("/protected");
      })
      .catch((err) => {
        console.log(err);
        alert("Unable to sign in");
        this.setState({ ...this.state, isLoading: false });
      });
  };

  render() {
    return (
      <div className='LoginPage'>
        <h2>Login Page</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            name='username'
            placeholder='Username'
            onChange={this.handleChange}
          />
          <input
            name='password'
            placeholder='Password'
            onChange={this.handleChange}
          />
          <button>Login</button>
        </form>
        {this.state.isLoading && (
          <div>
            <h3>Logging in</h3>
          </div>
        )}
      </div>
    );
  }
}

export default Login;
