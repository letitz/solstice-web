import React, { PropTypes } from "react";
import ImmutablePropTypes from "react-immutable-proptypes";

import RoomChatForm from "./RoomChatForm";
import RoomChatHeader from "./RoomChatHeader";
import RoomChatMessageList from "./RoomChatMessageList";

const ID = "room-chat";

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
        const { room, roomActions } = props;
        if (room && room.membership == "NonMember") {
            roomActions.join(room.name);
        }
    }

    render() {
        const { login_user_name, room, roomActions } = this.props;

        if (!room) {
            return (
                <div id={ID}>
                    <RoomChatHeader
                        roomActions={roomActions}
                    />
                </div>
            );
        }

        const { name, membership, messages } = room;

        if (membership != "Member") {
            return (
                <div id={ID}>
                    <RoomChatHeader
                        room={{
                            membership,
                            name
                        }}
                        roomActions={roomActions}
                    />
                </div>
            );
        }

        // room.membership == "Member"
        return (
            <div id={ID}>
                <RoomChatHeader
                    room={{
                        membership,
                        name
                    }}
                    roomActions={roomActions}
                />
                <RoomChatMessageList
                    login_user_name={login_user_name}
                    messages={messages}
                />
                <RoomChatForm
                    roomName={name}
                    sendMessage={roomActions.sendMessage}
                />
            </div>
        );
    }
}

RoomChat.propTypes = {
    login_user_name: PropTypes.string,
    room: PropTypes.shape({
        name:       PropTypes.string.isRequired,
        membership: PropTypes.string.isRequired,
        messages:   ImmutablePropTypes.list.isRequired
    }),
    roomActions: PropTypes.shape({
        join: PropTypes.func.isRequired,
        sendMessage:  PropTypes.func.isRequired
    }).isRequired
};

export default RoomChat;
