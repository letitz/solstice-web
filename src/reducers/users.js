import Immutable from "immutable";

import OrderedMap from "../utils/OrderedMap";

import { SOCKET_RECEIVE_MESSAGE } from "../constants/ActionTypes";

const initialState = OrderedMap();

const reduceUsersReceiveMessage = (users, message) => {
    switch (message.variant) {
        case "UserListResponse":
            return users.updateAll(message.data.user_list,
                (newUser, oldUser) => {
                    if (!oldUser) {
                        oldUser = Immutable.Map();
                    }
                    oldUser.merge(newUser);
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
