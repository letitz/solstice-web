import React, { PropTypes } from "react";
import { Link } from "react-router";
import ImmutablePropTypes from "react-immutable-proptypes";

import md5 from "md5";

const Room = ({ name, data }) => {
    const { membership, userCount } = data;

    const classes = ["room"];
    if (membership == "Member") {
        classes.push("room-joined");
    }

    const path = `/app/rooms/${md5(name)}`;

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
    data: ImmutablePropTypes.map.isRequired
};

export default Room;
