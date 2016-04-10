//This file merely configures the store for hot reloading.
//This boilerplate file is likely to be the same for each project that uses Redux.
//With Redux, the actual stores are in /reducers.

import { createStore, compose } from "redux";
import rootReducer from "../reducers";

export default function configureStore(initialState, storeEnhancer) {
    if (window.devToolsExtension) {
        // Enable Redux devtools if the extension is installed in developer's
        // browser.
        storeEnhancer = compose(storeEnhancer, window.devToolsExtension());
    }

    const store = createStore(rootReducer, initialState, storeEnhancer);

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers');
            store.replaceReducer(nextReducer);
        });
    }

    return store;
}
