import React, { PropTypes } from "react";

const Room = ({ isSelected, name, onClick }) => {
    let className;
    if (isSelected) {
        className = "room room-selected";
    } else {
        className = "room";
    }
    return (
        <a className={className} onClick={onClick} href="#">
            {name}
        </a>
    );
};

Room.propTypes = {
    isSelected: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

export default Room;
