import {
    ROOM_SELECT,
    ROOM_JOIN
} from "../constants/ActionTypes";

import SocketActions from "./SocketActions";

import ControlRequest from "../utils/ControlRequest";

export default ({
    getRoomList: () => SocketActions.send(ControlRequest.roomList()),

    select: (room) => ({
        type: ROOM_SELECT,
        payload: room
    }),

    join: (room) => ({
        type: ROOM_JOIN,
        paylod: room
    })
});
