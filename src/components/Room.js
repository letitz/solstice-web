import React, { PropTypes } from "react";
import { Link } from "react-router";

const Room = ({ name, onClick, room }) => {
    const classes = ["room"];
    if (room.membership == "Member") {
        classes.push("room-joined");
    }

    const base64Name = btoa(encodeURIComponent(name));
    const path = `/app/rooms/${base64Name}`;

    return (
        <Link to={path}
            activeClassName="room-selected"
            className={classes.join(" ")}
        >
            <span className="room-name">{name}</span>
            <span className="room-user-count">({room.user_count})</span>
        </Link>
    );
};

Room.propTypes = {
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    room: PropTypes.shape({
        membership: PropTypes.string.isRequired,
        user_count: PropTypes.number.isRequired
    })
};

export default Room;
