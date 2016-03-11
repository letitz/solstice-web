import React, { PropTypes } from "react";
import { connect } from "react-redux";

import ControlRequest from "../utils/ControlRequest";
import propTypeSymbol from "../utils/propTypeSymbol";
import {
    LOGIN_STATUS_UNKNOWN,
    LOGIN_STATUS_PENDING,
    LOGIN_STATUS_SUCCESS,
    LOGIN_STATUS_FAILURE
} from "../constants/login";

const ID = "login-status-pane";

const INTERVAL_MSEC = 60 * 1000;

class LoginStatusPane extends React.Component
{
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const fetchStatus = () => {
            this.props.socketSend(ControlRequest.loginStatus());
        };
        fetchStatus();
        // Refresh login status periodically
        this.interval_id = setInterval(fetchStatus, INTERVAL_MSEC);
    }

    componentWillUnmount() {
        clearInterval(this.interval_id);
    }

    render_unknown() {
        return (
            <div id={ID}>
                Fetching login status...
            </div>
        );
    }

    render_pending() {
        return (
            <div id={ID}>
                Logging in as {this.props.username}...
            </div>
        );
    }

    render_success() {
        let motd_element;
        if (this.props.motd) {
            motd_element = (
                <span id="login-motd">
                    MOTD: {this.props.motd}
                </span>
            );
        }
        return (
            <div id={ID}>
                Logged in as {this.props.username}
                {motd_element}
            </div>
        );
    }

    render_failure() {
        return (
            <div id={ID}>
                Failed to log in as {this.props.username}
                <span id="login-reason">
                    Reason: {this.props.reason}
                </span>
            </div>
        );
    }

    render() {
        switch (this.props.status) {
            case LOGIN_STATUS_UNKNOWN:
                return this.render_unknown();
            case LOGIN_STATUS_PENDING:
                return this.render_pending();
            case LOGIN_STATUS_SUCCESS:
                return this.render_success();
            case LOGIN_STATUS_FAILURE:
                return this.render_failure();
        }
    }
}

LoginStatusPane.propTypes = {
    status: propTypeSymbol.isRequired,
    username: PropTypes.string,
    motd: PropTypes.string,
    reason: PropTypes.string,
    socketSend: PropTypes.func.isRequired
};

export default connect(
    state => state.login
)(LoginStatusPane);
