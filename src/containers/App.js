// This file bootstraps the app with the boilerplate necessary
// to support hot reloading in Redux
import React, {PropTypes} from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import RoomActions from "../actions/RoomActions";
import SocketActions from "../actions/SocketActions";
import SocketHandlerActions from "../actions/SocketHandlerActions";

import SolsticeApp from "../components/SolsticeApp";

const App = (props) => (<SolsticeApp {...props} />);

App.propTypes = {
    actions: PropTypes.object.isRequired,
    socket: PropTypes.object.isRequired
};

const mapStateToProps = ({ socket })  => ({ socket });

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            room: bindActionCreators(RoomActions, dispatch),
            socket: bindActionCreators(SocketActions, dispatch),
            socketHandlers: bindActionCreators(SocketHandlerActions, dispatch)
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
