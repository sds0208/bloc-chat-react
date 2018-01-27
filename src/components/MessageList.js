import React, { Component } from 'react';

class MessageList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      currentRoomMessages: [],
      currentUserName: '',
      newMessageContent: '',
      currentTime: '',
      currentRoom: ''
    };
    this.messagesRef = this.props.firebase.database().ref('messages');
    this.createMessage = this.createMessage.bind(this);
    this.filterAndDisplayMessages = this.filterAndDisplayMessages.bind(this);
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.activeRoom !== this.props.activeRoom) {
      this.filterAndDisplayMessages( nextProps.activeRoom );
    }
  }

  createMessage(event) {
    event.preventDefault();
    this.messagesRef.push({
      username: this.state.currentUserName,
      content: this.state.newMessageContent,
      sentAt: this.state.currentTime,
      roomId: this.state.currentRoom
    });
    this.setState({ newMessageContent: '' })
  }


  filterAndDisplayMessages(activeRoom) {
    this.setState({ currentRoomMessages: this.state.messages.filter(message => message.roomId === activeRoom.key) })
  }

  render() {
    return (
      <div className="messages">
        <h2>Messages</h2>
        <div className="messages-list">
          {this.state.currentRoomMessages.map(message =>
            <div key={message.key}>
              <h5>{message.username} at {message.sentAt}:</h5>
              <h6>{message.content}</h6>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default MessageList;
