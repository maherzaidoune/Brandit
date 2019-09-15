import {
    LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
} from '../types';

const INITIAL_STATE = {
    isLoggedIn: false
};

export default (state = INITIAL_STATE, action) => {
    console.log(action);
    switch (action.type) {
        default:
                return state;
    }
}
