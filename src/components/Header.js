import React, { PropTypes } from "react";
import { Link } from "react-router";

const Header = (props) => {
    return (
        <header>
            <h1>Solstice web UI</h1>
            <Link to="/app/rooms" activeClassName="active">
                Rooms
            </Link>
            <Link to="/app/users" activeClassName="active">
                Users
            </Link>
        </header>
    );
};

Header.propTypes = {};

export default Header;
