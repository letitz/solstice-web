import Immutable from "immutable";

import {
    ROOM_JOIN,
    ROOM_SAY,
    ROOM_SELECT,
    SOCKET_RECEIVE_MESSAGE
} from "../constants/ActionTypes";

const initialState = {
    rooms: Immutable.OrderedMap(),
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
    let new_rooms = Immutable.OrderedMap();
    for (const [ room_name, room_data ] of room_list) {
        // Transform room_data.messages to an immutable list.
        room_data.messages = Immutable.List(room_data.messages);
        // Get the old room data.
        const old_data = old_rooms.get(room_name);
        // Merge the old data and the new data, overwriting with new data if
        // conflicting.
        const new_data = {
            ...old_data,
            ...room_data
        };
        new_rooms = new_rooms.set(room_name, new_data);
    }
    return new_rooms;
};

const reduceReceiveMessage = (rooms, payload) => {
    switch (payload.variant) {
        case "RoomListResponse":
            return reduceRoomList(rooms, payload.data.rooms);

        case "SayRoomResponse":
        {
            const { room_name, user_name, message } = payload.data;
            const room_data = rooms.get(room_name);
            if (!room_data) {
                console.log(`Error: room "${room_name} not found`);
                return rooms;
            }
            const new_room_data = {
                ...room_data,
                messages: room_data.messages.push({ user_name, message })
            };
            return rooms.set(room_name, new_room_data);
        }

        default:
            return rooms;
    }
};

export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case SOCKET_RECEIVE_MESSAGE:
            return {
                ...state,
                rooms: reduceReceiveMessage(state.rooms, payload)
            };

        case ROOM_SAY:
            return state;

        case ROOM_SELECT:
            return {
                ...state,
                selected: payload
            };

        case ROOM_JOIN:
        {
            const rooms = state.rooms.merge({
                [payload]: {
                    joined: true
                }
            });
            return {
                ...state,
                rooms
            };
        }

        default:
            return state;
    }
};
