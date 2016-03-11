import { SOCKET_RECEIVE_MESSAGE } from "../constants/ActionTypes";
import {
    LOGIN_STATUS_UNKNOWN,
    LOGIN_STATUS_PENDING,
    LOGIN_STATUS_SUCCESS,
    LOGIN_STATUS_FAILURE
} from "../constants/login";

const initialState = {
    status: LOGIN_STATUS_UNKNOWN
};

export default (state = initialState, action) => {
    const { type, payload } = action;
    if (type !== SOCKET_RECEIVE_MESSAGE) {
        return state;
    }

    const { variant, data } = payload;
    if (variant !== "LoginStatusResponse") {
        return state;
    }

    switch (data.variant) {
        case "Pending":
        { // sub-block required otherwise const username declarations clash
            const [ username ] = data.fields;
            return {
                status: LOGIN_STATUS_PENDING,
                username
            };
        }
        case "Success":
        { // sub-block required otherwise const username declarations clash
            const [ username, motd ] = data.fields;
            return {
                status: LOGIN_STATUS_SUCCESS,
                username,
                motd
            };
        }

        case "Failure":
        { // sub-block required otherwise const username declarations clash
            const [ username, reason ] = data.fields;
            return {
                status: LOGIN_STATUS_FAILURE,
                username,
                reason
            };
        }

        default:
            return state;
    }
};
