import React, { PropTypes } from "react";
import { withRouter } from "react-router";
import ImmutablePropTypes from "react-immutable-proptypes";

const make_header = (title, showUsersButton, leaveButton) => (
    <div id="room-chat-header">
        <div id="room-chat-header-title">{title}</div>
        {showUsersButton}
        {leaveButton}
    </div>
);

const RoomChatHeader = ({ room, roomActions, router }) => {
    if (!room) {
        return make_header("Select a room");
    }

    switch (room.membership) {
        case "Member":
        {
            const onClickLeave = (event) => {
                router.push("/app/rooms");
                roomActions.leave(room.name);
            };
            const leaveButton = <button onClick={onClickLeave}>Leave</button>;

            let toggleUsersButton;
            if (room.showUsers) {
                const onClick = (event) => roomActions.hideUsers(room.name);
                toggleUsersButton = (
                    <button onClick={onClick}>Hide users</button>
                );
            } else {
                const onClick = (event) => roomActions.showUsers(room.name);
                toggleUsersButton = (
                    <button onClick={onClick}>Show users</button>
                );
            }

            return make_header(room.name, toggleUsersButton, leaveButton);
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
        name: PropTypes.string.isRequired,
        showUsers: PropTypes.bool
    }),
    roomActions: PropTypes.shape({
        leave: PropTypes.func.isRequired,
        select: PropTypes.func.isRequired
    }).isRequired,
    router: PropTypes.object.isRequired
};

export default withRouter(RoomChatHeader);
