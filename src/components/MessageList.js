import React, { Component } from 'react';

class MessageList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      currentRoomMessages: [],
      newMessageContent: ''
    };
    this.messagesRef = this.props.firebase.database().ref('messages');
    this.createMessage = this.createMessage.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
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


  createMessage(newMessageContent) {
    const date = new Date();
    if (!this.props.activeRoom || !this.props.user) {alert('Please select a room to send a message.')}
    if (newMessageContent.length > 1) {
      this.messagesRef.push({
        content: this.state.newMessageContent,
        roomId: this.props.activeRoom.key,
        sentAt: [date.toLocaleDateString(), date.toLocaleTimeString()],
        username: this.props.user.displayName
      });
    } else {
      alert('Message must contain at least 1 character.');
    }
    this.setState({ newMessageContent: '' });
  }

  handleContentChange(event) {
    event.preventDefault();
    this.setState({newMessageContent: event.target.value });
  }

  filterAndDisplayMessages(activeRoom) {
    this.setState({ currentRoomMessages: this.state.messages.filter(message => message.roomId === activeRoom.key) });
  }

  render() {
    return (
      <div className="messages">

        <h2>Messages</h2>
        <form className="create-message" onSubmit={() => this.createMessage(this.state.newMessageContent)} >
          <input type="text" value={this.state.newMessageContent} onChange={this.handleContentChange} />
          <button type="submit">Send Message</button>
        </form>
        <div className="messages-list">
          {this.state.currentRoomMessages.map(message =>
            <div key={message.key} className="message">
              <h5>{message.username} on {message.sentAt[0]} at {message.sentAt[1]} - {message.content}</h5>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default MessageList;
