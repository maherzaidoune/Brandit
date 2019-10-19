import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  GET_MASK,
  GET_MASK_SUCCESS,
  GET_MASK_FAILED,
  GET_LOGO,
  GET_LOGO_SUCCESS,
  GET_LOGO_FAILED,
  GET_ICONS,
  GET_ICONS_SUCCESS,
  GET_ICONS_FAILED
} from '../actions/types';

const INITIAL_STATE = {
  isLoggedIn: false,
  isRequesting: false,
  masq: [],
  logo: [],
};

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case LOGIN_USER:
      return {...state, isRequesting: true};
    case LOGIN_USER_SUCCESS:
      return {...state, isRequesting: false};
    case LOGIN_USER_FAILED:
      return {...state, isRequesting: false};
    default:
      return state;
  }
};
