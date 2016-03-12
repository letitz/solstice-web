import React, { PropTypes } from "react";

import Room from "./Room";
import RoomListHeader from "./RoomListHeader";

const RoomList = ({ refresh, rooms, roomActions }) => {
    const children = [];

    for (const [room_name, room_data] of rooms) {
        const onClick = (event) => {
            roomActions.select(room_name);
        };

        children.push(
            <li key={room_name}>
                <Room onClick={onClick} name={room_name} {...room_data} />
            </li>
        );
    }

    return (
        <div id="room-list">
            <RoomListHeader refresh={refresh}/>
            <ul> {children} </ul>
        </div>
    );
};

RoomList.propTypes = {
    refresh: PropTypes.func.isRequired,
    rooms: PropTypes.object.isRequired,
    roomActions: PropTypes.object.isRequired
};

export default RoomList;
