/*

    Create a form to collects data for a new friend.
    Make a POST request to add a friend to the database
    Each friend item that is in the friends array should have the following format:

{
  id: 1
  name: 'Joe',
  age: 24,
  email: 'joe@lambdaschool.com',
}

    If you'd like, you can create multiple "view" components for your routes. You could have a component who's sole purpose is to render the login form; one for a form for updating a user; another component who's sole purpose is for creating users; and then another component who's sole purpose is to delete a user.
    It really is up to you how you build this project. I suggest writing down the flow you want to follow, and then writing down each individual piece you need for each step in the flow so that this process doesn't feel as overwhelming.

*/

import React from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

class AddFriendForm extends React.Component {
  constructor() {
    super();
    this.state = { friend: { name: "", age: "", email: "" } };
  }

  submitHandler = (event) => {
    event.preventDefault();
    axiosWithAuth()
      .post("/api/friends", this.state.friend)
      .then((res) => {
        //alert(${this.state.friend} has been added);
        ///add clear form on submit or button click for name, age, email
        this.setState({ friend: { name: "", age: "", email: "" } });
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  changeHandler = (event) => {
    this.setState({
      friend: { ...this.state.friend, [event.target.name]: event.target.value },
    });
    console.log(this.state);
  };

  render() {
    return (
      <div className='AddFriend'>
        <h2>Add Friend</h2>
        <form onSubmit={this.submitHandler}>
          <input onChange={this.changeHandler} placeholder='Name' name='name' />
          <input onChange={this.changeHandler} placeholder='Age' name='age' />
          <input
            onChange={this.changeHandler}
            placeholder='Email'
            name='email'
          />

          <button>Add Friend</button>
        </form>
      </div>
    );
  }
}

export default AddFriendForm;
