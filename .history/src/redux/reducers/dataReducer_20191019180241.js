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
    isLoggedIn: false,
    isRequesting: false,
    masq: [],
    logo: [],
  };