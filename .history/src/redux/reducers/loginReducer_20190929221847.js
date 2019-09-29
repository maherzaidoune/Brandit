import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  GET_MASK,
  GET_MASK_SUCCESS,
  GET_MASK_FAILED,
} from '../actions/types';

const INITIAL_STATE = {
  isLoggedIn: false,
  isRequesting: false,
  masq: [],
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
    case GET_MASK:
      return {...state, isRequesting: true};
    case GET_MASK_SUCCESS:
      console.log("mask : " + action.payload.data[0].masque_mobile)
      return {...state, isRequesting: false, masq: action.payload.data[0].masque_mobile};
    case GET_MASK_FAILED:
      return {...state, isRequesting: false, masq: []};
    default:
      return state;
  }
};
