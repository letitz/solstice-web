import React, { PropTypes } from "react";
import ImmutablePropTypes from "react-immutable-proptypes";

const make_header = (title, button) => (
    <div id="room-chat-header">
        <div id="room-chat-header-title">{title}</div>
        {button}
    </div>
);

const RoomChatHeader = ({ room, roomActions }) => {
    if (!room) {
        return make_header("Select a room");
    }

    switch (room.membership) {
        case "Member":
        {
            const onClick = (event) => {
                roomActions.select(null);
                roomActions.leave(room.name);
            };
            const button = <button onClick={onClick}>Leave</button>;
            return make_header(room.name, button);
        }

        case "NonMember":
            return make_header(`Not a member of ${room.name}`);

        case "Joining":
            return make_header(`Joining ${room.name}`);

        case "Leaving":
            return make_header(`Leaving ${room.name}`);
    }
};

RoomChatHeader.propTypes = {
    room: PropTypes.shape({
        membership: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    }),
    roomActions: PropTypes.shape({
        leave: PropTypes.func.isRequired,
        select: PropTypes.func.isRequired
    }).isRequired
};

export default RoomChatHeader;
