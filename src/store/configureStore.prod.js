import { createStore } from 'redux';
import rootReducer from '../reducers';

export default function configureStore(initialState, enhancer) {
  return createStore(rootReducer, initialState, enhancer);
}
