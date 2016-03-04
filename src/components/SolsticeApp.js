import React, {PropTypes} from "react";

import ConnectForm from  "../components/ConnectForm";
import { STATE_OPEN } from "../constants/socket";

const SolsticeApp = (props) => {
    const { socket, actions } = props;
    if (socket.state !== STATE_OPEN ) {
        return (
            <ConnectForm socket={socket}
                socketActions={actions.socketActions}/>
        );
    }
    return (
        <div>
            <h1>Solstice web UI</h1>
            <div>Socket open</div>
        </div>
    );
};

SolsticeApp.propTypes = {
    socket: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

export default SolsticeApp;
