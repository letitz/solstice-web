// This file bootstraps the app with the boilerplate necessary
// to support hot reloading in Redux
import React, {PropTypes} from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import SocketActionsFactory from "../actions/SocketActionsFactory";
import SocketHandlerActions from "../actions/SocketHandlerActions";
import RoomActionsFactory from "../actions/RoomActionsFactory";

import SolsticeApp from "../components/SolsticeApp";

import SocketClient from "../utils/SocketClient";

const App = (props) => (<SolsticeApp {...props} />);

App.propTypes = {
    actions: PropTypes.object.isRequired,
    socket: PropTypes.object.isRequired
};

const mapStateToProps = ({ socket })  => ({ socket });

function mapDispatchToProps(dispatch) {
    const callbacks = bindActionCreators(SocketHandlerActions, dispatch);
    const socketClient = new SocketClient(callbacks);
    const socketActions = SocketActionsFactory(socketClient);
    const roomActions = RoomActionsFactory(socketActions);
    return {
        actions: {
            room: bindActionCreators(roomActions, dispatch),
            socket: bindActionCreators(socketActions, dispatch)
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
