import {
    REQUEST_CHANGE_PASSWORD,
    REQUEST_CHANGE_PASSWORD_SUCCESS,
    REQUEST_CHANGE_PASSWORD_FAILED,
  } from '../actions/types';
  
  const INITIAL_STATE = {
    isRequesting: false
  };


export default (state = INITIAL_STATE, action) => {
    console.log(action);
    switch (action.type) {
      case REQUEST_CHANGE_PASSWORD:
        return {...state, isRequesting: true};
      case REQUEST_CHANGE_PASSWORD_SUCCESS:
        return {...state, isRequesting: false};
      case REQUEST_CHANGE_PASSWORD_FAILED:
        return {...state, isRequesting: false};
      default:
        return state;
    }
  };