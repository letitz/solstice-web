import React, { PropTypes } from "react";
import ImmutablePropTypes from "react-immutable-proptypes";

const RoomChatMessageList = ({ messages }) => {
    // Append all messages in the chat room.
    const children = [];
    let i = 0;
    for (const { user_name, message } of messages) {
        children.push(
            <li key={i} className="room-chat-message">
                {user_name}: {message}
            </li>
        );
        i++;
    }

    return (
        <div id="room-chat-messages">
            <ul>{children}</ul>
        </div>
    );
};

RoomChatMessageList.propTypes = {
    messages: ImmutablePropTypes.list.isRequired
};

export default RoomChatMessageList;

