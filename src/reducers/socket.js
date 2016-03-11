import * as types from "../constants/ActionTypes";
import {
    STATE_OPENING, STATE_OPEN, STATE_CLOSING, STATE_CLOSED
} from "../constants/socket.js";

const initialState = {
    state: STATE_CLOSED,
    url: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.SOCKET_SET_OPENING:
            if (action.error) {
                return state;
            }
            return { ...state, state: STATE_OPENING, url: action.payload };

        case types.SOCKET_SET_OPEN:
            return { ...state, state: STATE_OPEN };

        case types.SOCKET_SET_CLOSING:
            if (action.error) {
                return state;
            }
            return { ...state, state: STATE_CLOSING };

        case types.SOCKET_SET_CLOSED:
            return { ...state, state: STATE_CLOSED };

        case types.SOCKET_SET_ERROR:
            if (state.state === STATE_OPENING) {
                return { ...state, state: STATE_CLOSED };
            }
            return state;

        default:
            return state;
    }
};
