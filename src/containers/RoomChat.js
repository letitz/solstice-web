import React, { PropTypes } from "react";
import ImmutablePropTypes from "react-immutable-proptypes";

import RoomChatForm from "../components/RoomChatForm";
import RoomChatMessageList from "../components/RoomChatMessageList";

const ID = "room-chat";
const ID_HEADER = "room-chat-header";

class RoomChat extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.join_if_non_member(this.props);
    }

    componentWillReceiveProps(props) {
        this.join_if_non_member(props);
    }

    join_if_non_member(props) {
        const { name, room, roomActions } = props;
        if (room && room.membership == "NonMember") {
            roomActions.join(name);
        }
    }

    render_only_header(string) {
        return (
            <div id={ID}>
                <div id={ID_HEADER}>
                    {string}
                </div>
            </div>
        );
    }

    render() {
        const { login_user_name, name, room, roomActions } = this.props;

        // If no room is selected, just tell the user to select one.
        if (!name || !room) {
            return this.render_only_header("Select a room");
        }

        switch (room.membership) {
            case "NonMember":
                return this.render_only_header(`Not a member of ${name}`);

            case "Joining":
                return this.render_only_header(`Joining ${name}`);

            case "Leaving":
                return this.render_only_header(`Leaving ${name}`);
        }

        // room.membership == "Member"
        return (
            <div id="room-chat">
                <div id="room-chat-header">{name}</div>
                <RoomChatMessageList
                    login_user_name={login_user_name}
                    messages={room.messages}
                />
                <RoomChatForm
                    name={name}
                    sendMessage={roomActions.sendMessage}
                />
            </div>
        );
    }
}

RoomChat.propTypes = {
    login_user_name: PropTypes.string.isRequired,
    name: PropTypes.string,
    room: PropTypes.shape({
        membership: PropTypes.string.isRequired,
        messages:   ImmutablePropTypes.list.isRequired
    }),
    roomActions: PropTypes.shape({
        join: PropTypes.func.isRequired,
        sendMessage:  PropTypes.func.isRequired
    }).isRequired
};

export default RoomChat;
