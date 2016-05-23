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
    roomMap:        Immutable.OrderedMap(),
    roomNameByHash: Immutable.Map()
};

const reduceRoomList = (state, roomList) => {
    const { roomMap, roomNameByHash } = state;

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
        const roomData = roomMap.get(roomName);
        // Merge the old data and the new data, overwriting with new data if
        // conflicting.
        const mergedRoomData = {
            ...roomData,
            ...newRoomData
        };
        newRoomMap = newRoomMap.set(roomName, mergedRoomData);
    }
    return {
        ...state,
        roomMap: newRoomMap,
        roomNameByHash
    };
};

const reduceReceiveMessageRoom = (roomData, { variant, data }) => {
    switch (variant) {
        case "RoomJoinResponse":
            return {
                ...roomData,
                membership: "Member"
            };

        case "RoomLeaveResponse":
            return {
                ...roomData,
                membership: "NonMember"
            };

        case "RoomMessageResponse":
        {
            const { user_name, message } = data;
            return {
                ...roomData,
                messages: roomData.messages.push({ user_name, message })
            };
        }
    }
};

const reduceReceiveMessage = (state, message) => {
    const { variant, data } = message;
    switch (variant) {
        case "RoomJoinResponse":
        case "RoomLeaveResponse":
        case "RoomMessageResponse":
        {
            const { room_name } = data;
            const roomData = state.roomMap.get(room_name);
            const roomMap = state.roomMap.set(room_name,
                reduceReceiveMessageRoom(roomData, { variant, data })
            );
            return {
                ...state,
                roomMap
            };
        }

        case "RoomListResponse":
            return reduceRoomList(state, data.rooms);

        default:
            return state;
    }
};

const reduceRoom = (roomData, { type, payload }) => {
    switch (type) {
        case ROOM_JOIN:
            return {
                ...roomData,
                membership: "Joining"
            };

        case ROOM_LEAVE:
            return {
                ...roomData,
                membership: "Leaving"
            };

        case ROOM_SHOW_USERS:
            return {
                ...roomData,
                showUsers: true
            };

        case ROOM_HIDE_USERS:
            return {
                ...roomData,
                showUsers: false
            };
    }
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case SOCKET_RECEIVE_MESSAGE:
            return reduceReceiveMessage(state, payload);

        case ROOM_JOIN:
        case ROOM_LEAVE:
        case ROOM_SHOW_USERS:
        case ROOM_HIDE_USERS:
        {
            const roomData = state.roomMap.get(payload);
            const roomMap = state.roomMap.set(payload,
                reduceRoom(roomData, action)
            );
            return {
                ...state,
                roomMap
            };
        }

        case ROOM_MESSAGE:
        default:
            return state;
    }
};
