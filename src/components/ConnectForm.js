import React, {PropTypes} from "react";
import {reduxForm} from "redux-form";

import { STATE_CLOSED } from "../constants/socket";
import ControlRequest from "../utils/ControlRequest";

const ConnectForm = (props) => {
    const { fields: { url }, handleSubmit, socket, socketActions } = props;
    const submit = (values, dispatch) => {
        dispatch(socketActions.open(values.url));
    };
    return (
        <form onSubmit={handleSubmit(submit)}>
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
    socketActions: PropTypes.object.isRequired
};

export default reduxForm({
    form: "connect",
    fields: ["url"]
})(ConnectForm);
