import { combineReducers } from "redux";
import { reducer as form } from "redux-form";

import socket from "./socket";

const rootReducer = combineReducers({
    socket,
    form
});

export default rootReducer;
