import React, { PropTypes } from "react";

const Room = ({ name }) => {
    return <div className="room">{name}</div>;
};

Room.propTypes = {
    name: PropTypes.string.isRequired
};

export default Room;
