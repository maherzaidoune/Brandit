import {
    LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
} from '../actions/types';

const INITIAL_STATE = {
    isLoggedIn: false, 
    is
};

export default (state = INITIAL_STATE, action) => {
    console.log(action);
    switch (action.type) {
        case LOGIN_USER
        default:
                return state;
    }
}
