import React, { Component } from "react";
import axios from "axios";
import FriendsView from "./FriendView";

class FriendViewContainer extends Component {
  constructor() {
    super();
    this.state = {
      friendsData: [],
      newFriend: {
        name: "",
        age: "",
        email: ""
      }
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:5000/friends")
      .then(response => this.setState({ friendsData: response.data }))
      .catch(error => console.log(error));
  }
  changeHandler = event => {
    this.setState({
      newFriend: {
        ...this.state.newFriend,
        [event.target.name]: event.target.value
      }
    });
  };
  unfriend = (event, id) => {
    console.log({id})
    event.preventDefault();
    
    axios
      .delete(`http://localhost:5000/friends/${id}`)
      .then(response => this.setState({ friendsData: response.data }))
      .catch(error => console.log(error));
  };
  update =(event,id)=>{
    event.preventDefault();
    axios
      .put(`http://localhost:5000/friends/${id}`)
      .then(response => this.setState({ friendsData: response.data }))
      .catch(error => console.log(error));
  }
  submitHandler = event => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/friends", this.state.newFriend)
      .then(response => this.setState({ friendsData: response.data }));
    this.setState({
      newFriend: {
        name: "",
        age: "",
        email: ""
      }
    });
  };
  render() {
    return (
      <div>
        <FriendsView
          friendsData={this.state.friendsData}
          unfriend={this.unfriend}
          update={this.update}
        />
        <form type="submit" onSubmit={this.submitHandler}>
          Name:{" "}
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={this.state.newFriend.name}
            onChange={this.changeHandler}
          />
          Age:{" "}
          <input
            type="text"
            placeholder="Age"
            name="age"
            value={this.state.newFriend.age}
            onChange={this.changeHandler}
          />
          Email:{" "}
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={this.state.newFriend.email}
            onChange={this.changeHandler}
          />
          <button onClick={this.submitHandler}> Add friend</button>
        </form>
      </div>
    );
  }
}

export default FriendViewContainer;
