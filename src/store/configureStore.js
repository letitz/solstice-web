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
    return configureStore(
        undefined,
        applyMiddleware(thunk, promise, logger)
    );
};
