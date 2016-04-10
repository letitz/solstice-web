import React, { PropTypes } from "react";
import { connect } from "react-redux";

import RoomActions from "../actions/RoomActions";
import RoomChatForm from "../components/RoomChatForm";

const RoomChat = ({ name, data, roomActions }) => {
    if (!name) {
        return <div id="room-chat">Select a room</div>;
    }

    // Append all messages in the chat room.
    const children = [];
    let i = 0;
    for (const { user_name, message } of data.messages) {
        children.push(
            <li key={i} class="message">
                {user_name}: {message}
            </li>
        );
        i++;
    }

    return (
        <div id="room-chat">
            <div id="room-chat-header">{name}</div>
            <div id="room-chat-messages">
                <ul>{children}</ul>
            </div>
            <RoomChatForm
                name={name}
                say={roomActions.say}
            />
        </div>
    );
};

RoomChat.propTypes = {
    data: PropTypes.object,
    name: PropTypes.string,
    roomActions: PropTypes.object.isRequired
};

export default RoomChat;
