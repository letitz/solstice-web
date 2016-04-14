import React, { PropTypes } from "react";
import { connect } from "react-redux";

import LoginStatusPane from "../components/LoginStatusPane";
import SocketStatusPane from "../components/SocketStatusPane";

const Footer = ({ actions, login, socket }) => {
    return (
        <footer>
            <SocketStatusPane {...socket} />
            <LoginStatusPane {...login} loginActions={actions.login} />
        </footer>
    );
};

Footer.propTypes = {
    actions: PropTypes.object.isRequired,
    login: PropTypes.object.isRequired,
    socket: PropTypes.object.isRequired
};

const mapStateToProps = ({ socket, login }) => ({ socket, login });

export default connect(
    mapStateToProps
)(Footer);
