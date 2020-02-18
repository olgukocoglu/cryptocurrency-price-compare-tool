import axios from 'axios';
import { LOADED } from './types';

export const loaded = () => {
  return async function(dispatch) {
    axios.get(process.env.REACT_APP_API_URL + 'GetPrices').then((data) => {
      dispatch({ type: LOADED, data: data.data });
    });
  };
};
