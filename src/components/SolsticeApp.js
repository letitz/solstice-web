import React, {PropTypes} from "react";

import ConnectForm from  "./ConnectForm";
import Header from "./Header";
import Footer from "./Footer";
import SocketStatusPane from "./SocketStatusPane";

import LoginStatusPane from "../containers/LoginStatusPane";
import RoomsPane from "../containers/RoomsPane";

import { STATE_OPEN } from "../constants/socket";

const SolsticeApp = (props) => {
    const { actions, socket } = props;
    if (socket.state !== STATE_OPEN ) {
        return (
            <main>
                <ConnectForm socket={socket}
                    socketOpen={actions.socketActions.open}/>
                <SocketStatusPane {...socket} />
            </main>
        );
    }
    return (
        <div id="solstice-app">
            <Header />
            <main>
                <RoomsPane socketSend={actions.socketActions.send}/>
            </main>
            <Footer socket={socket} socketActions={actions.socketActions} />
        </div>
    );
};

SolsticeApp.propTypes = {
    actions: PropTypes.object.isRequired,
    socket: PropTypes.object.isRequired
};

export default SolsticeApp;
