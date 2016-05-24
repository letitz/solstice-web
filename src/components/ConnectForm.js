import React, {PropTypes} from "react";
import {reduxForm} from "redux-form";
import ImmutablePropTypes from "react-immutable-proptypes";

import SocketStatusPane from "./SocketStatusPane";
import { STATE_CLOSED } from "../constants/socket";

const ConnectForm = (props) => {
    const { fields: { url }, handleSubmit, socket, actions } = props;

    const onSubmit = handleSubmit((values) => {
        return actions.socket.open(values.url, actions.socketHandlers);
    });

    const isSocketClosed = socket.state === STATE_CLOSED;

    return (
        <div id="connect-form">
            <h2>Connect to a solstice client</h2>
            <form onSubmit={onSubmit}>
                <input type="url" defaultValue="ws://localhost:2244" {...url}
                    required pattern="wss?://.+"/>
                <button type="submit" disabled={!isSocketClosed}>
                    Connect
                </button>
            </form>
            <SocketStatusPane
                state={socket.state}
                url={socket.url}
            />
        </div>
    );
};

ConnectForm.propTypes = {
    fields:       PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    socket:       ImmutablePropTypes.record.isRequired,
    actions:      PropTypes.object.isRequired
};

export default reduxForm({
    form: "connect",
    fields: ["url"]
})(ConnectForm);
