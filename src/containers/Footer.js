import React, { PropTypes } from "react";
import { connect } from "react-redux";

import LoginStatusPane from "../components/LoginStatusPane";
import SocketStatusPane from "../components/SocketStatusPane";

const Footer = ({ login, socket }) => {
    return (
        <footer>
            <SocketStatusPane {...socket} />
            <LoginStatusPane {...login} />
        </footer>
    );
};

Footer.propTypes = {
    login: PropTypes.object.isRequired,
    socket: PropTypes.object.isRequired
};

const mapStateToProps = ({ socket, login }) => ({ socket, login });

export default connect(
    mapStateToProps
)(Footer);
