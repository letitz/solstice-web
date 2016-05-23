import React, { PropTypes } from "react";
import { connect } from "react-redux";

import propTypeSymbol from "../utils/propTypeSymbol";
import {
    LOGIN_STATUS_UNKNOWN,
    LOGIN_STATUS_GETTING,
    LOGIN_STATUS_PENDING,
    LOGIN_STATUS_SUCCESS,
    LOGIN_STATUS_FAILURE
} from "../constants/login";

class LoginStatusPane extends React.Component
{
    constructor(props) {
        super(props);
    }

    render() {
        let statusText;
        let motd;
        let reason;

        switch (this.props.status) {
            case LOGIN_STATUS_UNKNOWN:
                statusText = "unknown";
                break;

            case LOGIN_STATUS_GETTING:
                statusText = "fetching";
                break;

            case LOGIN_STATUS_PENDING:
                statusText = `logging in as ${this.props.username}`;
                break;

            case LOGIN_STATUS_SUCCESS:
                statusText = `logged in as ${this.props.username}`;
                motd = (
                    <span id="login-status-motd">
                        MOTD: {this.props.motd}
                    </span>
                );
                break;

            case LOGIN_STATUS_FAILURE:
                statusText = `failed to log in as ${this.props.username}`;
                reason = (
                    <span id="login-status-reason">
                        Reason: {this.props.reason}
                    </span>
                );
                break;
        }

        return (
            <div id="login-status-pane">
                <span id="login-status-text">
                    Login status: {statusText}
                </span>
                {motd}
                {reason}
            </div>
        );
    }
}

LoginStatusPane.propTypes = {
    status: propTypeSymbol.isRequired,
    username: PropTypes.string,
    motd: PropTypes.string,
    reason: PropTypes.string
};

export default LoginStatusPane;
