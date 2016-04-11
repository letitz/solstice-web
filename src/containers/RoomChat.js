import React, { PropTypes } from "react";

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
        const { name, room, roomActions } = this.props;

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
                <RoomChatMessageList messages={room.messages} />
                <RoomChatForm name={name} say={roomActions.say} />
            </div>
        );
    }
}

RoomChat.propTypes = {
    room: PropTypes.object,
    name: PropTypes.string,
    roomActions: PropTypes.object.isRequired
};

export default RoomChat;
