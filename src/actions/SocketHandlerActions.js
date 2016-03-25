import {
    SOCKET_SET_CLOSED,
    SOCKET_SET_ERROR,
    SOCKET_SET_OPEN,
    SOCKET_RECEIVE_MESSAGE
} from "../constants/ActionTypes";

export default {
    onclose: event => ({
        type: SOCKET_SET_CLOSED,
        payload: event.code
    }),

    onerror: event => ({ type: SOCKET_SET_ERROR }),

    onopen: event => ({ type: SOCKET_SET_OPEN }),

    onmessage: event => {
        console.log(`Received message: ${event.data}`);
        const action = { type: SOCKET_RECEIVE_MESSAGE };
        try {
            const { variant, fields: [data] } = JSON.parse(event.data);
            if (typeof variant === "undefined") {
                throw new Error('Missing "variant" field in control response');
            }
            action.payload = { variant, data };
        } catch (err) {
            action.error = true;
            action.payload = err;
        }
        return action;
    }
};
