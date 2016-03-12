import React, { PropTypes } from "react";

const Room = ({ name, onClick }) => {
    return (
        <a className="room" onClick={onClick} href="#">
            {name}
        </a>
    );
};

Room.propTypes = {
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

export default Room;
