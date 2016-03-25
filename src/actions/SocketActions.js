import {
    SOCKET_RECEIVE_MESSAGE,
    SOCKET_SEND_MESSAGE,
    SOCKET_SET_CLOSED,
    SOCKET_SET_CLOSING,
    SOCKET_SET_ERROR,
    SOCKET_SET_OPEN,
    SOCKET_SET_OPENING
} from "../constants/ActionTypes";

export default ({
    open: (url, handlers) => ({
        type: SOCKET_SET_OPENING,
        payload: {
            url,
            onclose: handlers.onclose,
            onerror: handlers.onerror,
            onopen: handlers.onopen,
            onmessage: handlers.onmessage
        }
    }),

    close: () => ({ type: SOCKET_SET_CLOSING }),

    send: (message) => ({
        type: SOCKET_SEND_MESSAGE,
        payload: message
    })
});
