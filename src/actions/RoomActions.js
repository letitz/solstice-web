import {
    ROOM_JOIN,
    ROOM_SAY,
    ROOM_SELECT
} from "../constants/ActionTypes";

import SocketActions from "./SocketActions";

import ControlRequest from "../utils/ControlRequest";

export default ({
    getRoomList: () => SocketActions.send(ControlRequest.roomList()),

    join: (room) => SocketActions.send(ControlRequest.joinRoom(room)),

    select: (room) => ({
        type: ROOM_SELECT,
        payload: room
    }),

    say: (room, message) => (dispatch) => {
        dispatch(SocketActions.send(ControlRequest.sayRoom(room, message)));
        dispatch({
            type: ROOM_SAY,
            payload: {
                room_name: room,
                message
            }
        });
    }
});
