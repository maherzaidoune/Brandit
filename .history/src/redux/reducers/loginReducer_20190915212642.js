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
  console.log(action);
  switch (action.type) {
    case LOGIN_USER:
      return {...state, isRequesting: true};
    case LOGIN_USER_SUCCESS:
      return {...state, isRequesting: true};
    case LOGIN_USER_FAILED:
      return {...state, isRequesting: true};
    default:
      return state;
  }
};
