import {
    ROOM_GET_LIST,
    ROOM_JOIN,
    ROOM_LEAVE,
    ROOM_MESSAGE,
    ROOM_SELECT
} from "../constants/ActionTypes";

export default ({
    getList: () => ({
        type: ROOM_GET_LIST
    }),

    join: (room_name) => ({
        type: ROOM_JOIN,
        payload: room_name
    }),

    leave: (room_name) => ({
        type: ROOM_LEAVE,
        payload: room_name
    }),

    select: (room_name) => ({
        type: ROOM_SELECT,
        payload: room_name
    }),

    sendMessage: (room_name, message) => ({
        type: ROOM_MESSAGE,
        payload: {
            room_name,
            message
        }
    })
});
