import {
    SOCKET_SET_CLOSED,
    SOCKET_SET_ERROR,
    SOCKET_SET_OPEN,
    SOCKET_RECEIVE_MESSAGE
} from "../constants/ActionTypes";

export default {
    onclose: event => ({
        type: SOCKET_SET_CLOSED,
        payload: {
            code: event.code
        }
    }),

    onerror: event => ({
        type: SOCKET_SET_ERROR
    }),

    onopen: event => ({
        type: SOCKET_SET_OPEN
    }),

    onmessage: event => {
        const action = { type: SOCKET_RECEIVE_MESSAGE };
        try {
            action.payload = JSON.parse(event.data);
        } catch (err) {
            action.error = true;
            action.payload = err;
        }
        return action;
    }
};
