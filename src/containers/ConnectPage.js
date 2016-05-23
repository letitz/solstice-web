import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { hashHistory, withRouter } from "react-router";

import LoginActions from "../actions/LoginActions";
import SocketActions from "../actions/SocketActions";
import SocketHandlerActions from "../actions/SocketHandlerActions";

import { STATE_OPEN } from "../constants/socket";
import {
    LOGIN_STATUS_SUCCESS,
    LOGIN_STATUS_UNKNOWN
} from "../constants/login";

import ConnectForm from  "../components/ConnectForm";
import LoginStatusPane from "../components/LoginStatusPane";

class ConnectPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getLoginStatusOrRedirect(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.getLoginStatusOrRedirect(nextProps);
    }

    getLoginStatusOrRedirect(props) {
        const { actions, login, router, socket } = props;
        if (socket.state === STATE_OPEN)
        {
            switch (login.status) {
                case LOGIN_STATUS_UNKNOWN:
                    actions.login.getStatus();
                    break;

                case LOGIN_STATUS_SUCCESS:
                    router.push("/app/rooms");
                    break;
            }
        }
    }

    render() {
        const { actions, login, socket } = this.props;

        let loginStatusPane;

        if (socket.state === STATE_OPEN &&
                login.status === LOGIN_STATUS_UNKNOWN)
        {
            loginStatusPane = (
                <LoginStatusPane {...login} loginActions={actions.login} />
            );
        }

        return (
            <div id="connect-page">
                <ConnectForm socket={socket} actions={actions} />
                {loginStatusPane}
            </div>
        );
    }
}

ConnectPage.propTypes = {
    actions: PropTypes.shape({
        login:          PropTypes.object.isRequired,
        socket:         PropTypes.object.isRequired,
        socketHandlers: PropTypes.object.isRequired
    }).isRequired,

    login:  PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
    socket: PropTypes.object.isRequired
};

const mapStateToProps = ({ login, socket }) => ({ login, socket });

const mapDispatchToProps = (dispatch) => ({
    actions: {
        login:          bindActionCreators(LoginActions, dispatch),
        socket:         bindActionCreators(SocketActions, dispatch),
        socketHandlers: bindActionCreators(SocketHandlerActions, dispatch)
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(ConnectPage));
