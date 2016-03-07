import React, { PropTypes } from "react";

import {
    STATE_OPENING, STATE_OPEN, STATE_CLOSING, STATE_CLOSED
} from "../constants/socket";

const SocketStatusPane = (props) => {
    const { state, url } = props;
    let string;
    switch (state) {
        case STATE_OPENING:
            string = `connecting to ${url}`;
            break;
        case STATE_OPEN:
            string = `connected to ${url}`;
            break;
        case STATE_CLOSING:
            string = `disconnecting from ${url}`;
            break;
        case STATE_CLOSED:
            string = `disconnected`;
            break;
    }
    return <div>Connection status: {string}</div>;
};

SocketStatusPane.propTypes = {
    state: PropTypes.number.isRequired,
    url: PropTypes.string
};

export default SocketStatusPane;
