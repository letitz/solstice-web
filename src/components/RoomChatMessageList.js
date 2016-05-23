import React, { PropTypes } from "react";
import ImmutablePropTypes from "react-immutable-proptypes";

const RoomChatMessageList = ({ loginUserName, messages }) => {
    // Append all messages in the chat room.
    const children = [];
    let i = 0;
    for (const { user_name, message } of messages) {
        if (user_name == loginUserName) {
            children.push(
                <li key={i} className="room-chat-message room-chat-message-me">
                    <div className="room-chat-message-text">{message}</div>
                </li>
            );
        } else {
            children.push(
                <li key={i} className="room-chat-message">
                    <div className="room-chat-message-user">{user_name}</div>
                    <div className="room-chat-message-text">{message}</div>
                </li>
            );
        }
        i++;
    }

    return <ul id="room-chat-message-list">{children}</ul>;
};

RoomChatMessageList.propTypes = {
    loginUserName: PropTypes.string.isRequired,
    messages: ImmutablePropTypes.listOf(
        PropTypes.shape({
            user_name: PropTypes.string.isRequired,
            message:   PropTypes.string.isRequired
        }).isRequired
    ).isRequired
};

export default RoomChatMessageList;

