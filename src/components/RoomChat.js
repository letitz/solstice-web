import React, { PropTypes } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ImmutablePropTypes from "react-immutable-proptypes";

import RoomActions from "../actions/RoomActions";

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
        const { room, roomActions } = props;
        if (room && room.membership == "NonMember") {
            roomActions.join(room.name);
        }
    }

    render() {
        const { loginUserName, room, roomActions } = this.props;

        if (!room) {
            return (
                <div id={ID}>
                    <RoomChatHeader
                        roomActions={roomActions}
                    />
                </div>
            );
        }

        const { name, membership, messages, showUsers } = room;

        const header = (
            <RoomChatHeader
                room={{
                    membership,
                    name,
                    showUsers
                }}
                roomActions={roomActions}
            />
        );

        if (membership != "Member") {
            return (
                <div id={ID}>
                    {header}
                </div>
            );
        }

        // room.membership == "Member"
        return (
            <div id={ID}>
                {header}
                <RoomChatMessageList
                    loginUserName={loginUserName}
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
    loginUserName: PropTypes.string,
    room: PropTypes.shape({
        name:       PropTypes.string.isRequired,
        membership: PropTypes.string.isRequired,
        messages:   ImmutablePropTypes.list.isRequired,
        showUsers:  PropTypes.bool
    }),
    roomActions: PropTypes.shape({
        join: PropTypes.func.isRequired,
        sendMessage:  PropTypes.func.isRequired
    }).isRequired
};

export default RoomChat;
