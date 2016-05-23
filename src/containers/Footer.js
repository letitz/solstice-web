import React, { PropTypes } from "react";
import { connect } from "react-redux";
import ImmutablePropTypes from "react-immutable-proptypes";

import LoginStatusPane from "../components/LoginStatusPane";
import SocketStatusPane from "../components/SocketStatusPane";

const Footer = ({ login, socket }) => {
    return (
        <footer>
            <SocketStatusPane {...socket} />
            <LoginStatusPane
                status={login.get("status")}
                username={login.get("username")}
                motd={login.get("motd")}
                reason={login.get("reason")}
            />
        </footer>
    );
};

Footer.propTypes = {
    login: ImmutablePropTypes.map.isRequired,
    socket: PropTypes.object.isRequired
};

const mapStateToProps = ({ socket, login }) => ({ socket, login });

export default connect(
    mapStateToProps
)(Footer);
