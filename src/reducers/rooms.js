import Immutable from "immutable";

import {
    ROOM_JOIN,
    ROOM_LEAVE,
    ROOM_MESSAGE,
    ROOM_SHOW_USERS,
    ROOM_HIDE_USERS,
    SOCKET_RECEIVE_MESSAGE
} from "../constants/ActionTypes";

const initialState = Immutable.Map({
    roomMap:        Immutable.OrderedMap(),
    roomNameByHash: Immutable.Map()
});

const reduceRoomList = (state, roomList) => {
    const roomMap = state.get("roomMap");
    const roomNameByHash = state.get("roomNameByHash");

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
        // Get the old room data.
        let roomData = roomMap.get(roomName);
        if (roomData) {
            // Scrap the old message list, we only want the new message list.
            roomData.remove("messages");
        } else {
            // If the room did not exist, make up an empty one.
            roomData = Immutable.Map();
        }
        // Merge the old data and the new data, overwriting with new data if
        // conflicting.
        const mergedRoomData = roomData.merge(newRoomData);
        // Insert that in the new room map.
        newRoomMap = newRoomMap.set(roomName, mergedRoomData);
    }

    return state
        .set("roomMap", newRoomMap)
        .set("roomNameByHash", roomNameByHash);
};

const reduceReceiveMessageRoom = (roomData, { variant, data }) => {
    switch (variant) {
        case "RoomJoinResponse":
            return roomData.set("membership", "Member");

        case "RoomLeaveResponse":
            return roomData.set("membership", "NonMember");

        case "RoomMessageResponse":
        {
            const { user_name, message } = data;
            const messages = roomData.get("messages")
                .push({user_name, message});
            return roomData.set("messages", messages);
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
            return state.updateIn(["roomMap", data.room_name], (roomData) => {
                if (roomData) {
                    return reduceReceiveMessageRoom(roomData, message);
                } else {
                    console.log(`Error: unknown room ${data.room_name}`);
                    return roomData;
                }
            });
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
            return roomData.set("membership", "Joining");

        case ROOM_LEAVE:
            return roomData.set("membership", "Leaving");

        case ROOM_SHOW_USERS:
            return roomData.set("showUsers", true);

        case ROOM_HIDE_USERS:
            return roomData.set("showUsers", false);
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
            return state.updateIn(["roomMap", payload], (roomData) => {
                if (roomData) {
                    return reduceRoom(roomData, action);
                } else {
                    console.log(`Error: unknown room ${payload}`);
                    return roomData;
                }
            });
        }

        case ROOM_MESSAGE:
        default:
            return state;
    }
};
