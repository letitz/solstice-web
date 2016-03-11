import { combineReducers } from "redux";
import { reducer as form } from "redux-form";

import login from "./login";
import socket from "./socket";

const rootReducer = combineReducers({
    login,
    socket,
    form
});

export default rootReducer;
