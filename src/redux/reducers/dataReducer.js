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
    isRequesting: false,
    masq: [],
    landmasq: [],
    logo: [],
  };

  export default (state = INITIAL_STATE, action) => {
    console.log(action);
    switch (action.type) {
      case GET_MASK:
        return {...state, isRequesting: true};
      case GET_MASK_SUCCESS:
        return {...state, isRequesting: false, masq: action.payload.data.filter(i => i.orientation == 2).map(v => v.image) , landmasq: action.payload.data.filter(i => i.orientation == 1).map(v => v.image)};
      case GET_MASK_FAILED:
        return {...state, isRequesting: false, logo: []};
      case GET_LOGO:
        return {...state, isRequesting: true};
      case GET_LOGO_SUCCESS:
        return {...state, isRequesting: false, logo: action.payload.data.map(v => v.image)};
      case GET_LOGO_FAILED:
        return {...state, isRequesting: false, logo: []};
      default:
        return state;
    }
  };
  