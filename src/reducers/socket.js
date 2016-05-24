import Immutable from "immutable";

import * as types from "../constants/ActionTypes";
import {
    STATE_OPENING, STATE_OPEN, STATE_CLOSING, STATE_CLOSED
} from "../constants/socket";

import ControlRequest from "../utils/ControlRequest";

const SocketRecord = Immutable.Record({
    state:  STATE_CLOSED,
    socket: undefined,
    url:    undefined
});

const initialState = new SocketRecord();

export default (state = initialState, { type, payload }) => {
    const sendRequest = (controlRequest) => {
        try {
            state.socket.send(JSON.stringify(controlRequest));
        } catch (err) {
            console.log(`Socket error: failed to send ${controlRequest}`);
        }
    };

    switch (type) {
        case types.SOCKET_SET_OPENING:
        {
            if (state.state !== STATE_CLOSED) {
                console.log("Cannot open socket, already open");
                return state;
            }

            const { url, onopen, onclose, onerror, onmessage } = payload;
            const socket = new WebSocket(url);
            socket.onopen = onopen;
            socket.onclose = onclose;
            socket.onerror = onerror;
            socket.onmessage = onmessage;

            return state
                .set("state", STATE_OPENING)
                .set("socket", socket)
                .set("url", url);
        }

        case types.SOCKET_SET_OPEN:
            return state.set("state", STATE_OPEN);

        case types.SOCKET_SET_CLOSING:
            // Ooh bad stateful reducing...
            state.socket.close();
            return state.set("state", STATE_CLOSING);

        case types.SOCKET_SET_CLOSED:
            return state.set("state", STATE_CLOSED);

        case types.SOCKET_SET_ERROR:
            console.log("Socket error");
            return state.set("state", state.socket.readyState);

        case types.LOGIN_GET_STATUS:
            sendRequest(ControlRequest.loginStatus());
            return state;

        case types.ROOM_GET_LIST:
            sendRequest(ControlRequest.roomList());
            return state;

        case types.ROOM_JOIN:
            sendRequest(ControlRequest.roomJoin(payload));
            return state;

        case types.ROOM_LEAVE:
            sendRequest(ControlRequest.roomLeave(payload));
            return state;

        case types.ROOM_MESSAGE:
        {
            const { room_name, message } = payload;
            sendRequest(ControlRequest.roomMessage(room_name, message));
            return state;
        }

        case types.USER_GET_LIST:
            sendRequest(ControlRequest.userList());
            return state;

        default:
            return state;
    }
};
