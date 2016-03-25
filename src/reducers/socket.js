import * as types from "../constants/ActionTypes";
import {
    STATE_OPENING, STATE_OPEN, STATE_CLOSING, STATE_CLOSED
} from "../constants/socket.js";

const initialState = {
    state: STATE_CLOSED
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.SOCKET_SET_OPENING:
        {
            if (state.state !== STATE_CLOSED) {
                console.log("Cannot open socket, already open");
            }
            const { url, onopen, onclose, onerror, onmessage } = action.payload;
            const socket = new WebSocket(url);
            socket.onopen = onopen;
            socket.onclose = onclose;
            socket.onerror = onerror;
            socket.onmessage = onmessage;
            return {
                ...state,
                state: STATE_OPENING,
                socket,
                url
            };
        }

        case types.SOCKET_SET_OPEN:
            return { ...state, state: STATE_OPEN };

        case types.SOCKET_SET_CLOSING:
            // Ooh bad stateful reducing...
            state.socket.close();
            return { ...state, state: STATE_CLOSING };

        case types.SOCKET_SET_CLOSED:
            return { ...state, state: STATE_CLOSED };

        case types.SOCKET_SET_ERROR:
            console.log("Socket error");
            return { ...state, state: state.socket.readyState };

        case types.SOCKET_SEND_MESSAGE:
            try {
                state.socket.send(JSON.stringify(action.payload));
            } catch (err) {
                console.log(`Socket error: failed to send ${action.payload}`);
            }
            return state;

        default:
            return state;
    }
};
