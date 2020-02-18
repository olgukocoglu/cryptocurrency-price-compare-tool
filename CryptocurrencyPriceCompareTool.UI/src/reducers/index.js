import { combineReducers } from 'redux';
import loadReducer from './loadReducer.js';

export default combineReducers({
  loaded: loadReducer
});
