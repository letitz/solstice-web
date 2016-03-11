//This file merely configures the store for hot reloading.
//This boilerplate file is likely to be the same for each project that uses Redux.
//With Redux, the actual stores are in /reducers.

import { createStore } from "redux";
import rootReducer from "../reducers";

export default function configureStore(initialState, enhancer) {
  let createStoreModded;
  if (window.devToolsExtension) { //Enable Redux devtools if the extension is installed in developer's browser
    createStoreModded = window.devToolsExtension()(createStore);
  } else {
    createStoreModded = createStore;
  }

  const store = createStoreModded(rootReducer, initialState, enhancer);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
