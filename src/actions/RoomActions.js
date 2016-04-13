import {
    ROOM_JOIN,
    ROOM_LEAVE,
    ROOM_MESSAGE,
    ROOM_SELECT
} from "../constants/ActionTypes";

import SocketActions from "./SocketActions";

import ControlRequest from "../utils/ControlRequest";

export default ({
    getRoomList: () => SocketActions.send(ControlRequest.roomList()),

    join: (room_name) => (dispatch) => {
        dispatch({
            type: ROOM_JOIN,
            payload: room_name
        });
        dispatch(SocketActions.send(ControlRequest.roomJoin(room_name)));
    },

    leave: (room_name) => (dispatch) => {
        dispatch({
            type: ROOM_LEAVE,
            payload: room_name
        });
        dispatch(SocketActions.send(ControlRequest.roomLeave(room_name)));
    },

    select: (room_name) => ({
        type: ROOM_SELECT,
        payload: room_name
    }),

    sendMessage: (room_name, message) => (dispatch) => {
        dispatch({
            type: ROOM_MESSAGE,
            payload: {
                room_name,
                message
            }
        });
        dispatch(SocketActions.send(
                    ControlRequest.roomMessage(room_name, message)
        ));
    }
});
