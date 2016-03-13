import React, { PropTypes } from "react";
import { connect } from "react-redux";

const RoomChat = ({ name }) => {
    return <div id="room-chat">{name}</div>;
};

RoomChat.propTypes = {
    name: PropTypes.string
};

export default connect(
    (state) => ({ name: state.rooms.selected })
)(RoomChat);
