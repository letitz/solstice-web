import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
import promise from "redux-promise";
import createLogger from "redux-logger";

let configureStore;
if (process.env.NODE_ENV === 'production') {
  configureStore = require('./configureStore.prod').default;
} else {
  configureStore = require('./configureStore.dev').default;
}

export default () => {
    const logger = createLogger();
    const initialState = undefined;
    return configureStore(
        initialState,
        applyMiddleware(thunk, promise, logger)
    );
};
