import { applyMiddleware } from "redux";
import thunk from "redux-thunk";

let configureStore;
if (process.env.NODE_ENV === 'production') {
  configureStore = require('./configureStore.prod').default;
} else {
  configureStore = require('./configureStore.dev').default;
}

export default () => configureStore(undefined, applyMiddleware(thunk));
