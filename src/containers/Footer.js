import React, { PropTypes } from "react";
import { connect } from "react-redux";
import ImmutablePropTypes from "react-immutable-proptypes";

import LoginStatusPane from "../components/LoginStatusPane";
import SocketStatusPane from "../components/SocketStatusPane";

const Footer = ({ login, socket }) => {
    return (
        <footer>
            <SocketStatusPane
                state={socket.state}
                url={socket.url}
            />
            <LoginStatusPane
                status={login.status}
                username={login.username}
                motd={login.motd}
                reason={login.reason}
            />
        </footer>
    );
};

Footer.propTypes = {
    login:  ImmutablePropTypes.record.isRequired,
    socket: ImmutablePropTypes.record.isRequired
};

const mapStateToProps = ({ socket, login }) => ({ socket, login });

export default connect(
    mapStateToProps
)(Footer);
