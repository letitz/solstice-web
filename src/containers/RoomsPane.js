import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ImmutablePropTypes from "react-immutable-proptypes";

import RoomActions from "../actions/RoomActions";

import RoomChat from "../components/RoomChat";
import RoomList from "../components/RoomList";
import RoomUserList from "../components/RoomUserList";

class RoomsPane extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { loginUserName, params, rooms, roomActions } = this.props;

        let roomName;
        let roomChat;

        if (params && params.roomName) {
            roomName = decodeURIComponent(atob(params.roomName));

            const { membership, messages, showUsers } = rooms.get(roomName);
            const room = {
                name: roomName,
                membership,
                messages,
                showUsers
            };
            roomChat = (
                <RoomChat
                    loginUserName={loginUserName}
                    room={room}
                    roomActions={roomActions}
                />
            );
        }

        return (
            <div id="rooms-pane">
                <RoomList
                    rooms={rooms}
                    roomActions={roomActions}
                    selected={roomName}
                />
                <div id="room-selected-pane">
                    {roomChat}
                </div>
            </div>
        );
    }
}

RoomsPane.propTypes = {
    loginUserName: PropTypes.string.isRequired,
    params:        PropTypes.shape({
        roomName: PropTypes.string
    }),
    rooms:         ImmutablePropTypes.orderedMap.isRequired,
    roomActions:   PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    rooms: state.rooms.rooms,
    loginUserName: state.login.username
});

const mapDispatchToProps = (dispatch) => ({
    roomActions: bindActionCreators(RoomActions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RoomsPane);
