import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ImmutablePropTypes from "react-immutable-proptypes";

import RoomChat from "../components/RoomChat";
import RoomList from "../components/RoomList";
import RoomUserList from "../components/RoomUserList";

class RoomsPane extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { login_user_name, rooms, roomActions, selected } = this.props;

        let room;
        if (selected) {
            room = {
                ...rooms.get(selected),
                name: selected
            };
        }

        let roomUserList;
        if (room && room.showUsers) {
            roomUserList = <RoomUserList users={room.members} />;
        }

        return (
            <div id="rooms-pane">
                <RoomList
                    rooms={rooms}
                    roomActions={roomActions}
                    selected={selected}
                />
                <div id="room-selected-pane">
                    <RoomChat
                        login_user_name={login_user_name}
                        room={room}
                        roomActions={roomActions}
                    />
                    {roomUserList}
                </div>
            </div>
        );
    }
}

RoomsPane.propTypes = {
    login_user_name: PropTypes.string,
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
