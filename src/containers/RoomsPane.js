import React, { PropTypes } from "react";
import { connect } from "react-redux";

import RoomList from "../components/RoomList";
import ControlRequest from "../utils/ControlRequest";

const ID = "rooms-pane";

class RoomsPane extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.socketSend(ControlRequest.roomList());
    }

    render() {
        const onClick = (event) => {
            this.props.socketSend(ControlRequest.roomList());
            event.preventDefault();
        };

        return (
            <div id={ID}>
                <button onClick={onClick}>Refresh</button>
                <RoomList rooms={this.props.rooms} />
            </div>
        );
    }
}

RoomsPane.propTypes = {
    rooms: PropTypes.object.isRequired,
    socketSend: PropTypes.func.isRequired
};

export default connect(
    state => state.rooms
)(RoomsPane);
