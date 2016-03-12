import React, { PropTypes } from "react";

import SocketStatusPane from "./SocketStatusPane";

import LoginStatusPane from "../containers/LoginStatusPane";

const Footer = ({ socket, socketActions }) => {
    return (
        <footer>
            <SocketStatusPane {...socket} />
            <LoginStatusPane socketSend={socketActions.send} />
        </footer>
    );
};

Footer.propTypes = {
    socket: PropTypes.object.isRequired,
    socketActions: PropTypes.object.isRequired
};

export default Footer;
