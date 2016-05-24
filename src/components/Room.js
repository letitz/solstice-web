import React, { PropTypes } from "react";
import { Link } from "react-router";
import ImmutablePropTypes from "react-immutable-proptypes";

import md5 from "md5";

const Room = ({ name, data }) => {
    const membership = data.get("membership");
    const user_count = data.get("user_count");

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
            <span className="room-user-count">({user_count})</span>
        </Link>
    );
};

Room.propTypes = {
    name: PropTypes.string.isRequired,
    data: ImmutablePropTypes.map.isRequired
};

export default Room;
