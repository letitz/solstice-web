import Immutable from "immutable";

import {
    LOGIN_GET_STATUS,
    SOCKET_RECEIVE_MESSAGE
} from "../constants/ActionTypes";

import {
    LOGIN_STATUS_UNKNOWN,
    LOGIN_STATUS_GETTING,
    LOGIN_STATUS_PENDING,
    LOGIN_STATUS_SUCCESS,
    LOGIN_STATUS_FAILURE
} from "../constants/login";

const LoginRecord = Immutable.Record({
    status:   LOGIN_STATUS_UNKNOWN,
    username: undefined,
    motd:     undefined,
    reason:   undefined
});

const initialState = new LoginRecord();

const reduceReceiveMessage = (state, message) => {
    const { variant, data } = message;

    if (variant !== "LoginStatusResponse") {
        return state;
    }

    switch (data.variant) {
        case "Pending":
        { // sub-block required otherwise const username declarations clash
            const [ username ] = data.fields;
            return state
                .set("status", LOGIN_STATUS_PENDING)
                .set("username", username);
        }
        case "Success":
        { // sub-block required otherwise const username declarations clash
            const [ username, motd ] = data.fields;
            return state
                .set("status", LOGIN_STATUS_SUCCESS)
                .set("username", username)
                .set("motd", motd);
        }

        case "Failure":
        { // sub-block required otherwise const username declarations clash
            const [ username, reason ] = data.fields;
            return state
                .set("status", LOGIN_STATUS_FAILURE)
                .set("username", username)
                .set("reason", reason);
        }

        default:
            return state;
    }
};

export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case LOGIN_GET_STATUS:
            return state.set("status", LOGIN_STATUS_GETTING);

        case SOCKET_RECEIVE_MESSAGE:
            return reduceReceiveMessage(state, payload);

        default:
            return state;
    }
};
