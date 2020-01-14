import axios from 'axios';
import {BASE_URL} from './config';
import {
    REQUEST_CHANGE_PASSWORD,
    REQUEST_CHANGE_PASSWORD_SUCCESS,
    REQUEST_CHANGE_PASSWORD_FAILED,
} from './types';

export const change_password = (id, oldpassword, password, callback, callbackError) => {
    return dispatch => {
        dispatch({ type: REQUEST_CHANGE_PASSWORD });
        axios
          .get(`https://editor.qamous.net/api/action_change_pass/?id_client=${id}&oldpass=${oldpassword}&newpass=${password}`, { timeout: 5000 })
          .then(response => {
            dispatch({ type: REQUEST_CHANGE_PASSWORD_SUCCESS, payload: response });
            callback(response);
          })
          .catch(error => {
            dispatch({ type: REQUEST_CHANGE_PASSWORD_FAILED, payload: error });
            callbackError(error);
          });
      };
}