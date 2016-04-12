import {
    ROOM_JOIN,
    ROOM_MESSAGE,
    ROOM_SELECT
} from "../constants/ActionTypes";

import SocketActions from "./SocketActions";

import ControlRequest from "../utils/ControlRequest";

export default ({
    getRoomList: () => SocketActions.send(ControlRequest.roomList()),

    join: (room) => (dispatch) => {
        dispatch({
            type: ROOM_JOIN,
            payload: room
        });
        dispatch(SocketActions.send(ControlRequest.joinRoom(room)));
    },

    select: (room) => ({
        type: ROOM_SELECT,
        payload: room
    }),

    sendMessage: (room, message) => (dispatch) => {
        dispatch({
            type: ROOM_MESSAGE,
            payload: {
                room_name: room,
                message
            }
        });
        dispatch(SocketActions.send(ControlRequest.roomMessage(room, message)));
    }
});
