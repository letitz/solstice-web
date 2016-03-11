import React, {PropTypes} from "react";

import ConnectForm from  "../components/ConnectForm";
import Header from "../components/Header";
import SocketStatusPane from "../components/SocketStatusPane";

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
        <main>
            <Header />
            <SocketStatusPane {...socket} />
            <LoginStatusPane socketSend={actions.socketActions.send}/>
            <RoomsPane socketSend={actions.socketActions.send}/>
        </main>
    );
};

SolsticeApp.propTypes = {
    actions: PropTypes.object.isRequired,
    socket: PropTypes.object.isRequired
};

export default SolsticeApp;
