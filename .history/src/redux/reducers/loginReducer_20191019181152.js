import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
} from '../actions/types';

const INITIAL_STATE = {
  isLoggedIn: false,
  isRequesting: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {...state, isRequesting: true, isLoggedIn: false};
    case LOGIN_USER_SUCCESS:
      return {...state, isRequesting: false, isLoggedIn: true};
    case LOGIN_USER_FAILED:
      return {...state, isRequesting: false, isLoggedIn: false};
    default:
      return state;
  }
};