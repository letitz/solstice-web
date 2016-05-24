import Immutable from "immutable";

import OrderedMap from "../utils/OrderedMap";

import { SOCKET_RECEIVE_MESSAGE } from "../constants/ActionTypes";

const UserRecord = Immutable.Record({
    status:       "",
    averageSpeed: 0,
    numDownloads: 0,
    numFiles:     0,
    numFolders:   0,
    numFreeSlots: 0,
    country:      ""
});

const initialState = OrderedMap();

const reduceUsersReceiveMessage = (users, message) => {
    switch (message.variant) {
        case "UserListResponse":
            return users.updateAll(message.data.user_list,
                (newUser, oldUser) => {
                    if (!oldUser) {
                        oldUser = UserRecord();
                    }
                    return oldUser
                        .set("status",       newUser.status)
                        .set("averageSpeed", newUser.average_speed)
                        .set("numDownloads", newUser.num_downloads)
                        .set("numFiles",     newUser.num_files)
                        .set("numFolders",   newUser.num_folders)
                        .set("numFreeSlots", newUser.num_free_slots)
                        .set("country",      newUser.country);
                }
            );

        default:
            return users;
    }
};

const reduceUsers = (users = initialState, action) => {
    switch (action.type) {
        case SOCKET_RECEIVE_MESSAGE:
            return reduceUsersReceiveMessage(users, action.payload);

        default:
            return users;
    }
};

export default reduceUsers;
