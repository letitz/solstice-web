import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from "react-router";

import configureStore from './store/configureStore';
import createRoutes from "./createRoutes";

import './styles/styles.scss'; //Yep, that's right. You can import SASS/CSS files too! Webpack will run the associated loader and plug this into the page.

const store = configureStore();
const routes = createRoutes(store);

render(
  <Provider store={store}>
    <Router history={hashHistory}>
        {routes}
    </Router>
  </Provider>, document.getElementById('app')
);
