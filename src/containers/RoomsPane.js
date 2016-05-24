import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ImmutablePropTypes from "react-immutable-proptypes";

import RoomActions from "../actions/RoomActions";

import RoomChat from "../components/RoomChat";
import RoomList from "../components/RoomList";
import RoomUserList from "../components/RoomUserList";

const RoomsPane = (props) => {
    const { loginUserName, params, rooms, roomActions } = props;

    let roomName;
    let roomChat;

    if (params && params.roomNameHash) {
        roomName = rooms.getNameByHash(params.roomNameHash);

        const roomData = rooms.getByName(roomName);

        if (roomData) {
            const room = {
                name: roomName,
                membership: roomData.membership,
                messages:   roomData.messages,
                showUsers:  roomData.showUsers
            };

            roomChat = (
                <RoomChat
                    loginUserName={loginUserName}
                    room={room}
                    roomActions={roomActions}
                />
            );
        }
    }

    return (
        <div id="rooms-pane">
            <RoomList
                rooms={rooms}
                roomActions={roomActions}
            />
            <div id="room-selected-pane">
                {roomChat}
            </div>
        </div>
    );
};

RoomsPane.propTypes = {
    loginUserName: PropTypes.string.isRequired,
    params:        PropTypes.shape({
        roomNameHash: PropTypes.string
    }),
    rooms:       ImmutablePropTypes.record.isRequired,
    roomActions: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    loginUserName: state.login.username,
    rooms:         state.rooms
});

const mapDispatchToProps = (dispatch) => ({
    roomActions: bindActionCreators(RoomActions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RoomsPane);
