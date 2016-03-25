import React, {PropTypes} from "react";
import {reduxForm} from "redux-form";

import SocketStatusPane from "./SocketStatusPane";
import { STATE_CLOSED } from "../constants/socket";
import ControlRequest from "../utils/ControlRequest";

const ConnectForm = (props) => {
    const { fields: { url }, handleSubmit, socket, actions } = props;

    const onSubmit = handleSubmit((values) => {
        return actions.socket.open(values.url, actions.socketHandlers);
    });

    return (
        <div id="connect-form">
            <h2>Connect to a solstice client</h2>
            <form onSubmit={onSubmit}>
                <input type="url" defaultValue="ws://localhost:2244" {...url}
                    required pattern="wss?://.+"/>
                <button type="submit" disabled={socket.state !== STATE_CLOSED}>
                    Connect
                </button>
            </form>
            <SocketStatusPane {...socket} />
        </div>
    );
};

ConnectForm.propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    socket: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

export default reduxForm({
    form: "connect",
    fields: ["url"]
})(ConnectForm);
