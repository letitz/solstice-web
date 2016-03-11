import { combineReducers } from "redux";
import { reducer as form } from "redux-form";

import login from "./login";
import rooms from "./rooms";
import socket from "./socket";

const rootReducer = combineReducers({
    login,
    rooms,
    socket,
    form
});

export default rootReducer;
