import React, { PropTypes } from "react";
import ImmutablePropTypes from "react-immutable-proptypes";

import RoomChatForm from "../components/RoomChatForm";
import RoomChatHeader from "../components/RoomChatHeader";
import RoomChatMessageList from "../components/RoomChatMessageList";

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
        const { name, room, roomActions } = props;
        if (room && room.membership == "NonMember") {
            roomActions.join(name);
        }
    }

    render() {
        const { login_user_name, name, room, roomActions } = this.props;

        if (!name || !room) {
            return (
                <div id={ID}>
                    <RoomChatHeader
                        roomActions={roomActions}
                    />
                </div>
            );
        }

        if (room.membership != "Member") {
            return (
                <div id={ID}>
                    <RoomChatHeader
                        room={{ membership: room.membership, name}}
                        roomActions={roomActions}
                    />
                </div>
            );
        }

        // room.membership == "Member"
        return (
            <div id={ID}>
                <RoomChatHeader
                    room={{ membership: room.membership, name}}
                    roomActions={roomActions}
                />
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
