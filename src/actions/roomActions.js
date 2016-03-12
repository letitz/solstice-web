import { ROOM_SELECT } from "../constants/ActionTypes";

export default {
    select: (room_name) => ({
        type: ROOM_SELECT,
        payload: room_name
    })
};
