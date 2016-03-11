import React, { PropTypes } from "react";

import Room from "./Room";

const RoomList = ({ rooms }) => {
    const children = [];
    for (const [room_name, room_data] of rooms) {
        children.push(
            <li key={room_name}>
                <Room name={room_name} {...room_data} />
            </li>
        );
    }
    return (
        <div id="room-list">
            <div id="room-list-header">Room List</div>
            <ul> {children} </ul>
        </div>
    );
};

RoomList.propTypes = {
    rooms: PropTypes.object.isRequired
};

export default RoomList;
