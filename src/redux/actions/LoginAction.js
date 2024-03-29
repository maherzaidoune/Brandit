import {
    LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
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
          .get(`https://editor.qamous.net/api/action_login/?login=${username}&pass=${password}`, { timeout: 5000 })
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

