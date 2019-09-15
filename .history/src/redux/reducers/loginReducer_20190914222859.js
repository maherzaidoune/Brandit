import {
    LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
} from './types';

const INITIAL_STATE = {
    isLoggedIn: false,
    requesting: false
};

export default (state = INITIAL_STATE, action) => {
    console.log(action);
    switch (action.type) {
        case LOGIN_USER:
            return {...state, requesting: true}
        default:
                return state;
    }
}
