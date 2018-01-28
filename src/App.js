import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDD885qsbGeezbWVCPwK2KpalprJHraVjU",
  authDomain: "bloc-chat-react-69cac.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-69cac.firebaseio.com",
  projectId: "bloc-chat-react-69cac",
  storageBucket: "bloc-chat-react-69cac.appspot.com",
  messagingSenderId: "575546249156"
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { activeRoom: '', user: '' };
    this.activateRoom = this.activateRoom.bind(this);
  }

  activateRoom(room) {
    this.setState({ activeRoom: room });
    console.log(room);
  }

  setUser(user) {
    this.setState({ user: user });
    if (user !== null) {console.log(user.displayName)};
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
        </p>
        <main>
        </main>
        < User firebase={firebase} setUser={this.setUser.bind(this)} user={this.state.user} />
        < RoomList firebase={firebase} activeRoom={this.state.activeRoom} activateRoom={this.activateRoom.bind(this)}/>
        < MessageList firebase={firebase} activeRoom={this.state.activeRoom} />
      </div>
    );
  }
}

export default App;
