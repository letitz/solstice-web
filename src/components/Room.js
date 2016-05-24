import React, { PropTypes } from "react";
import { Link } from "react-router";

import md5 from "md5";

const Room = ({ name, membership, userCount }) => {
    const classes = ["room"];
    if (membership == "Member") {
        classes.push("room-joined");
    }

    const hash = md5(name);
    const path = `/app/rooms/${hash}`;

    return (
        <Link to={path}
            activeClassName="room-selected"
            className={classes.join(" ")}
        >
            <span className="room-name">{name}</span>
            <span className="room-user-count">({userCount})</span>
        </Link>
    );
};

Room.propTypes = {
    name: PropTypes.string.isRequired,
    membership: PropTypes.string.isRequired,
    userCount: PropTypes.number.isRequired
};

export default Room;
