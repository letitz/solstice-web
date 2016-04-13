import React, { PropTypes } from "react";
import ImmutablePropTypes from "react-immutable-proptypes";

const ID = "room-chat-header";

const RoomChatHeader = ({ membership, room_name, roomActions }) => {
    switch (membership) {
        case "Member":
        {
            const onClick = (event) => {
                roomActions.leave(room_name);
                roomActions.select(null);
                event.preventDefault();
            };
            return (
                <div id={ID}>
                    {room_name}
                    <button onClick={onClick}>Leave</button>
                </div>
            );
        }

        case "NonMember":
            return <div id={ID}>Not a member of {room_name}</div>;

        case "Joining":
            return <div id={ID}>Joining {room_name}</div>;

        case "Leaving":
            return <div id={ID}>Leaving {room_name}</div>;
    }
};

RoomChatHeader.propTypes = {
    membership: PropTypes.string.isRequired,
    room_name: PropTypes.string.isRequired,
    roomActions: PropTypes.shape({
        leave: PropTypes.func.isRequired,
        select: PropTypes.func.isRequired
    }).isRequired
};

export default RoomChatHeader;
