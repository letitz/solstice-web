import React, { PropTypes } from "react";
import ImmutablePropTypes from "react-immutable-proptypes";

import Room from "./Room";
import RoomListHeader from "./RoomListHeader";

class RoomList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { rooms, roomActions } = this.props;
        if (rooms.shouldUpdate()) {
            roomActions.getList();
        }
    }

    render() {
        const { rooms, roomActions } = this.props;

        const children = [];

        for (const [roomName, roomData] of rooms.byName) {
            children.push(
                <li key={roomName}>
                    <Room
                        name={roomName}
                        membership={roomData.get("membership")}
                        userCount={roomData.get("user_count")}
                    />
                </li>
            );
        }

        return (
            <div id="room-list">
                <RoomListHeader refresh={this.props.roomActions.getList}/>
                <ul> {children} </ul>
            </div>
        );
    }
}

RoomList.propTypes = {
    rooms: ImmutablePropTypes.record.isRequired,
    roomActions: PropTypes.shape({
        getList: PropTypes.func.isRequired
    }).isRequired
};

export default RoomList;
