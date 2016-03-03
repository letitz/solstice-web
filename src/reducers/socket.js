import objectAssign from "object-assign";

import * as types from "../constants/ActionTypes";

const STATE_OPENING = 0;
const STATE_OPEN = 1;
const STATE_CLOSING = 2;
const STATE_CLOSED = 3;

const initialState = {
    state: STATE_CLOSED,
    url: null
};

export default function socket(state = initialState, action) {
    switch (action.type) {
        case types.SOCKET_SET_OPENING:
            if (action.error) {
                return state;
            }
            return objectAssign({}, state, { state: STATE_OPENING });

        case types.SOCKET_SET_OPEN:
            return objectAssign({}, state, { state: STATE_OPEN });

        case types.SOCKET_SET_CLOSING:
            if (action.error) {
                return state;
            }
            return objectAssign({}, state, { state: STATE_CLOSING });

        case types.SOCKET_SET_CLOSED:
            return objectAssign({}, state, { state: STATE_CLOSED });

        case types.SOCKET_SET_ERROR:
            if (state.state === STATE_OPENING) {
                return objectAssign({}, state, { state: STATE_CLOSED });
            }
            return state;

        case types.SOCKET_RECEIVE_MESSAGE:
            console.log(`Socket received message: ${action.payload}`);
            return state;

        case types.SOCKET_SEND_MESSAGE:
            console.log("Sending message");
            return state;

        default:
            return state;
    }
}

