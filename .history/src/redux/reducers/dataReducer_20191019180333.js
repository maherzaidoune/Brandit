import {
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
    isRequesting: false,
    masq: [],
    logo: [],
  };

  export default (state = INITIAL_STATE, action) => {
    console.log(action);
    switch (action.type) {
      case LOGIN_USER:
      case GET_MASK:
        return {...state, isRequesting: true};
      case GET_MASK_SUCCESS:
        return {...state, isRequesting: false, masq: action.payload.data[0].map(v => state.imageUrl + v.image)};
      case GET_MASK_FAILED:
        return {...state, isRequesting: false, logo: []};
      case GET_LOGO:
        return {...state, isRequesting: true};
      case GET_LOGO_SUCCESS:
        return {...state, isRequesting: false, logo: action.payload.data[0].masque_mobile.map(v => state.imageUrl + v.image)};
      case GET_LOGO_FAILED:
        return {...state, isRequesting: false, logo: []};
      default:
        return state;
    }
  };
  