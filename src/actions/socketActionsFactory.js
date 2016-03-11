import {
    SOCKET_SET_OPENING, SOCKET_SET_CLOSING, SOCKET_SEND_MESSAGE
} from "../constants/ActionTypes";

export default (socketClient) => ({
    open: url => {
        const action = { type: SOCKET_SET_OPENING };
        try {
            socketClient.open(url);
            action.payload = url;
        } catch (err) {
            action.error = true;
            action.payload = err;
        }
        return action;
    },

    close: () => {
        const action = { type: SOCKET_SET_CLOSING };
        try {
            socketClient.close();
        } catch (err) {
            action.error = true;
            action.payload = err;
        }
        return action;
    },

    send: message => {
        const action = { type: SOCKET_SEND_MESSAGE };
        try {
            socketClient.send(JSON.stringify(message));
            action.payload = message;
        } catch (err) {
            action.error = true;
            action.payload = err;
        }
        return action;
    }
});
