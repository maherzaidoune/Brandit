import {
    LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
} from './types';

import {BASE_URL} from './config';

export const Login = (username, password) => {
    return dispatch => {
        dispatch({ type: LOGIN_USER });
        axios
          .post(`${BASE_URL}action_login/`, loginParams, { timeout: 5000 })
          .then(response => {
            dispatch({ type: LOGIN_USER_SUCCESS, payload: response });
            callback(response);
          })
          .catch(error => {
            dispatch({ type: LOGIN_USER_FAILED, payload: error });
            callbackError(error.response);
          });
      };
}