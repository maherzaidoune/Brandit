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
  imageUrl: "https://brandit.tn/admin/",
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
    case GET_MASK:
      return {...state, isRequesting: true};
    case GET_MASK_SUCCESS:
      return {...state, isRequesting: false, masq: action.payload.data[0].masque_mobile.map(v => state.imageUrl + v.image)};
    case GET_MASK_FAILED:
      return {...state, isRequesting: false, masq: []};
    default:
      return state;
  }
};
