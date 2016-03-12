import { ROOM_SELECT, SOCKET_RECEIVE_MESSAGE } from "../constants/ActionTypes";

const initialState = {
    rooms: new Map(),
    selected: null
};

const reduceRoomList = (old_rooms, room_list) => {
    // First sort the room list by room name
    room_list.sort((room_pair_1, room_pair_2) => {
        const name_1 = room_pair_1[0];
        const name_2 = room_pair_2[0];
        if (name_1 < name_2) {
            return -1;
        } else if (name_1 > name_2) {
            return 1;
        }
        return 0;
    });

    // Then build the new rooms map
    const new_rooms = new Map();
    for (const [ room_name, room_data ] of room_list) {
        const old_data = old_rooms.get(room_name);
        if (old_data) {
            new_rooms.set(room_name, { ...old_data, ...room_data });
        } else {
            new_rooms.set(room_name, room_data);
        }
    }
    return new_rooms;
};

const reduceReceiveMessage = (state, payload) => {
    switch (payload.variant) {
        case "RoomListResponse":
        {
            const rooms = reduceRoomList(state.rooms, payload.data.rooms);
            return { ...state, rooms };
        }
        default:
            return state;
    }
};

export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case SOCKET_RECEIVE_MESSAGE:
            return reduceReceiveMessage(state, payload);

        case ROOM_SELECT:
            return { ...state, selected: payload };

        default:
            return state;
    }
};
