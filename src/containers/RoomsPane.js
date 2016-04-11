import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import RoomList from "../components/RoomList";

import RoomChat from "../containers/RoomChat";

import ControlRequest from "../utils/ControlRequest";

class RoomsPane extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { actions, rooms, selected } = this.props;
        return (
            <div id="rooms-pane">
                <RoomList
                    rooms={rooms}
                    roomActions={actions.room}
                    selected={selected}
                />
                <RoomChat
                    name={selected}
                    room={rooms.get(selected)}
                    roomActions={actions.room}
                />
            </div>
        );
    }
}

RoomsPane.propTypes = {
    actions: PropTypes.object.isRequired,
    rooms: PropTypes.object.isRequired,
    selected: PropTypes.string
};

const mapStateToProps = (state) => state.rooms;

export default connect(
    mapStateToProps,
)(RoomsPane);
