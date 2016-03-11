import React, {PropTypes} from "react";
import {reduxForm} from "redux-form";

import { STATE_CLOSED } from "../constants/socket";
import ControlRequest from "../utils/ControlRequest";

const ConnectForm = (props) => {
    const { fields: { url }, handleSubmit, socket, socketOpen } = props;

    const onSubmit = handleSubmit((values) => socketOpen(values.url));

    return (
        <form onSubmit={onSubmit}>
            <input type="url" defaultValue="ws://localhost:2244" {...url}
                required pattern="wss?://.+"/>
            <button type="submit" disabled={socket.state !== STATE_CLOSED}>
                Connect
            </button>
        </form>
    );
};

ConnectForm.propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    socket: PropTypes.object.isRequired,
    socketOpen: PropTypes.func.isRequired
};

export default reduxForm({
    form: "connect",
    fields: ["url"]
})(ConnectForm);
