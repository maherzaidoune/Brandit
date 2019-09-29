import {
    LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  GET_MASK,
  GET_MASK_FAILED,
  GET_MASK_SUCCESS
} from './types';
import axios from 'axios';
import {BASE_URL} from './config';

export const Login = (username, password, callback, callbackError) => {
    const formData = new FormData();
    formData.append('login', username);
    formData.append('pw', password);
    return dispatch => {
        dispatch({ type: LOGIN_USER });
        axios
          .post(`http://brandit.tn/api/action_login/?login=`, formData, { timeout: 5000 })
          .then(response => {
            dispatch({ type: LOGIN_USER_SUCCESS, payload: response });
            callback(response);
          })
          .catch(error => {
            dispatch({ type: LOGIN_USER_FAILED, payload: error });
            callbackError(error);
          });
      };
}

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