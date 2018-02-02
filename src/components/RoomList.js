import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      newRoomName: ''
    };
    this.roomsRef = this.props.firebase.database().ref('rooms');
    this.handleChange = this.handleChange.bind(this);
    this.createRoom = this.createRoom.bind(this);
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) });
    });

  }

  handleChange(event) {
    event.preventDefault();
    this.setState({newRoomName: event.target.value});
  }

  createRoom(event) {
    event.preventDefault();
    this.roomsRef.push({ name: this.state.newRoomName });
    this.setState({ newRoomName: '' })
  }

  render() {
    return (
      <div className="rooms">
        <h2>Rooms</h2>
        <form className="create-room" onSubmit={this.createRoom}>
          <input type="text" value={this.state.newRoomName} onChange={this.handleChange}/>
          <button type="submit">Create Room</button>
        </form>

        {this.state.rooms.map(room =>
          <div className='roomlist'>
            <h4 key={room.key} className={this.props.activeRoom && this.props.activeRoom.key === room.key ? 'active-room' : 'room' } onClick={() => this.props.activateRoom(room)}>
              {room.name}
            </h4>
          </div>
        )}
      </div>
    );
  }
}

export default RoomList;
