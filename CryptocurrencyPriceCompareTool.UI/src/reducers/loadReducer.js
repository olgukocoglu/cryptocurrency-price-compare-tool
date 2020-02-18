import { LOADED } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    default:
      return state;
    case LOADED:
      return action.data;
  }
}
