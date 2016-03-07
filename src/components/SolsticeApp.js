import React, {PropTypes} from "react";

import ConnectForm from  "../components/ConnectForm";
import SocketStatusPane from "../components/SocketStatusPane";

import { STATE_OPEN } from "../constants/socket";

const SolsticeApp = (props) => {
    const { socket, actions } = props;
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
            <h1>Solstice web UI</h1>
            <SocketStatusPane {...socket} />
        </main>
    );
};

SolsticeApp.propTypes = {
    socket: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

export default SolsticeApp;
