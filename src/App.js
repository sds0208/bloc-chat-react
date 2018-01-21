import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';

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
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
        </p>
        < RoomList firebase={firebase} />
      </div>
    );
  }
}

export default App;
