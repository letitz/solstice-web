import React, { PropTypes } from "react";

const Room = ({ isSelected, name, onClick, room }) => {
    const classes = ["room"];
    if (isSelected) {
        classes.push("room-selected");
    }
    if (room.membership == "Member") {
        classes.push("room-joined");
    }
    return (
        <a className={classes.join(" ")} onClick={onClick} href="#">
            {name}
        </a>
    );
};

Room.propTypes = {
    isSelected: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    room: PropTypes.shape({
        membership: PropTypes.string.isRequired
    })
};

export default Room;
