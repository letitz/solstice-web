import Immutable from "immutable";

import OrderedMap from "../utils/OrderedMap";

import {
    ROOM_JOIN,
    ROOM_LEAVE,
    ROOM_MESSAGE,
    ROOM_SHOW_USERS,
    ROOM_HIDE_USERS,
    SOCKET_RECEIVE_MESSAGE
} from "../constants/ActionTypes";

const RoomRecord = Immutable.Record({
    membership: "",
    visibility: "",
    operated:   false,
    userCount:  0,
    owner:      "",
    operators:  Immutable.Map(),
    members:    Immutable.Map(),
    messages:   Immutable.List(),
    tickers:    Immutable.List()
});

const initialState = OrderedMap();

const reduceReceiveMessageRoom = (roomData, { variant, data }) => {
    switch (variant) {
        case "RoomJoinResponse":
            return roomData.set("membership", "Member");

        case "RoomLeaveResponse":
            return roomData.set("membership", "NonMember");

        case "RoomMessageResponse":
        {
            const { user_name, message } = data;
            const messages = roomData.messages.push({user_name, message});
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
            return state.updateByName(data.room_name, (roomData) => {
                if (roomData) {
                    return reduceReceiveMessageRoom(roomData, message);
                } else {
                    console.log(`Error: unknown room ${data.room_name}`);
                    return roomData;
                }
            });
        }

        case "RoomListResponse":
            return state.updateAll(data.rooms, (newData, oldData) => {
                if(!oldData) {
                    oldData = RoomRecord();
                }
                return oldData
                    .set("membership", newData.membership)
                    .set("visibility", newData.visibility)
                    .set("operated",   newData.operated)
                    .set("userCount",  newData.user_count)
                    .set("owner",      newData.owner)
                    .set("operators",  newData.operators)
                    .set("members",    newData.members)
                    .set("tickers",    newData.tickers);
            });

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
            return state.updateByName(payload, (roomData) => {
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
