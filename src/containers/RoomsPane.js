import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ImmutablePropTypes from "react-immutable-proptypes";

import RoomList from "../components/RoomList";

import RoomChat from "../containers/RoomChat";

import ControlRequest from "../utils/ControlRequest";

class RoomsPane extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { login_user_name, rooms, roomActions, selected } = this.props;
        return (
            <div id="rooms-pane">
                <RoomList
                    rooms={rooms}
                    roomActions={roomActions}
                    selected={selected}
                />
                <RoomChat
                    login_user_name={login_user_name}
                    name={selected}
                    room={rooms.get(selected)}
                    roomActions={roomActions}
                />
            </div>
        );
    }
}

RoomsPane.propTypes = {
    login_user_name: PropTypes.string.isRequired,
    rooms: ImmutablePropTypes.orderedMap.isRequired,
    roomActions: PropTypes.object.isRequired,
    selected: PropTypes.string
};

const mapStateToProps = (state) => ({
    login_user_name: state.login.username,
    rooms: state.rooms.rooms,
    selected: state.rooms.selected
});

export default connect(
    mapStateToProps,
)(RoomsPane);
