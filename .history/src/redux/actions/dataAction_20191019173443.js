import {
  GET_MASK,
  GET_MASK_FAILED,
  GET_MASK_SUCCESS
} from './types';
import axios from 'axios';
import {BASE_URL} from './config';

export const GetMasq = (id, callback, callbackError) => {
    return dispatch => {
        dispatch({ type: GET_MASK });
        axios
          .post(`http://brandit.tn/api/masques/?id=${id}`, { timeout: 5000 })
          .then(response => {
            dispatch({ type: GET_MASK_SUCCESS, payload: response });
            callback(response);
          })
          .catch(error => {
            dispatch({ type: GET_MASK_FAILED, payload: error });
            callbackError(error);
          });
      };
  }

  export const GetLogo = (id, callback, callbackError) => {
    return dispatch => {
        dispatch({ type: GET_MASK });
        axios
          .post(`http://brandit.tn/admin/api/logos/?id=${id}`, { timeout: 5000 })
          .then(response => {
            dispatch({ type: GET_MASK_SUCCESS, payload: response });
            callback(response);
          })
          .catch(error => {
            dispatch({ type: GET_MASK_FAILED, payload: error });
            callbackError(error);
          });
      };
  }