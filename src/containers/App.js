// This file bootstraps the app with the boilerplate necessary
// to support hot reloading in Redux
import React, {PropTypes} from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import SolsticeApp from "../components/SolsticeApp";
import socketActionsFactory from "../actions/socketActionsFactory";
import socketHandlerActions from "../actions/socketHandlerActions";
import SocketClient from "../utils/SocketClient";

const App = (props) => (<SolsticeApp {...props} />);

App.propTypes = {
    actions: PropTypes.object.isRequired,
    socket: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        socket: state.socket
    };
}

function mapDispatchToProps(dispatch) {
    const callbacks = bindActionCreators(socketHandlerActions, dispatch);
    const socketClient = new SocketClient(callbacks);
    const socketActions = socketActionsFactory(socketClient);
    return {
        actions: {
            socketActions: bindActionCreators(socketActions, dispatch)
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
