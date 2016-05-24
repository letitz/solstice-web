import React, { PropTypes } from "react";
import { Link } from "react-router";
import md5 from "md5";

const User = ({ name }) => {
    const path = `/app/users/${md5(name)}`;

    return (
        <Link to={path}
            className="user"
            activeClassName="user-selected"
        >
            {name}
        </Link>
    );
};

User.propTypes = {
    name: PropTypes.string.isRequired
};

export default User;
