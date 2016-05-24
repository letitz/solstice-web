import { combineReducers } from "redux";
import { reducer as form } from "redux-form";

import login from "./login";
import rooms from "./rooms";
import socket from "./socket";
import users from "./users";

const rootReducer = combineReducers({
    login,
    rooms,
    socket,
    users,
    form
});

export default rootReducer;
