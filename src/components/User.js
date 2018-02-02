import React, { Component } from 'react';

class User extends Component {

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    });
  }

  signIn() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup(provider);
  }

  signOut() {
    this.props.firebase.auth().signOut();
  }

  render() {

    return (
      <div className="user">
        <div className="user-name">{ this.props.user ? 'Signed in as ' + this.props.user.displayName : 'Welcome, Guest!' }</div>
        <button className="sign-in-button" onClick={ this.props.user ?  this.signOut.bind(this) : this.signIn.bind(this)}>{ this.props.user? 'Sign Out' : 'Google Sign In'}</button>
      </div>
    );
  }
}

export default User;
