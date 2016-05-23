import Immutable from "immutable";

import {
    ROOM_JOIN,
    ROOM_LEAVE,
    ROOM_MESSAGE,
    ROOM_SHOW_USERS,
    ROOM_HIDE_USERS,
    SOCKET_RECEIVE_MESSAGE
} from "../constants/ActionTypes";

const initialState = {
    rooms: Immutable.OrderedMap()
};

const reduceRoomList = (oldRoomMap, roomList) => {
    // First sort the room list by room name
    roomList.sort(([ roomName1 ], [ roomName2 ]) => {
        if (roomName1 < roomName2) {
            return -1;
        } else if (roomName1 > roomName2) {
            return 1;
        }
        return 0;
    });

    // Then build the new rooms map
    let newRoomMap = Immutable.OrderedMap();

    for (const [ roomName, newRoomData ] of roomList) {
        // Transform room_data.messages to an immutable list.
        newRoomData.messages = Immutable.List(newRoomData.messages);
        // Get the old room data.
        const oldRoomData = oldRoomMap.get(roomName);
        // Merge the old data and the new data, overwriting with new data if
        // conflicting.
        const mergedRoomData = {
            ...oldRoomData,
            ...newRoomData
        };
        newRoomMap = newRoomMap.set(roomName, mergedRoomData);
    }
    return newRoomMap;
};

const reduceReceiveMessage = (rooms, { variant, data }) => {
    switch (variant) {
        case "RoomJoinResponse":
        {
            const { room_name } = data;
            const room = rooms.get(room_name);
            return rooms.set(room_name, {
                ...room,
                membership: "Member"
            });
        }

        case "RoomLeaveResponse":
        {
            const room_name = data;
            const room = rooms.get(room_name);
            return rooms.set(room_name, {
                ...room,
                membership: "NonMember"
            });
        }

        case "RoomListResponse":
            return reduceRoomList(rooms, data.rooms);

        case "RoomMessageResponse":
        {
            const { room_name, user_name, message } = data;
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

        case ROOM_MESSAGE:
            return state;

        case ROOM_JOIN:
        {
            const rooms = state.rooms.set(payload, {
                ...state.rooms.get(payload),
                membership: "Joining"
            });
            return {
                ...state,
                rooms
            };
        }

        case ROOM_LEAVE:
        {
            const rooms = state.rooms.set(payload, {
                ...state.rooms.get(payload),
                membership: "Leaving"
            });
            return {
                ...state,
                rooms
            };
        }

        case ROOM_SHOW_USERS:
        {
            const rooms = state.rooms.set(payload, {
                ...state.rooms.get(payload),
                showUsers: true
            });
            return {
                ...state,
                rooms
            };
        }

        case ROOM_HIDE_USERS:
        {
            const rooms = state.rooms.set(payload, {
                ...state.rooms.get(payload),
                showUsers: false
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
