import { combineReducers } from 'redux';
const rootReducer = combineReducers({
	
});

export default (state, action) => (
    action.type === 'LOGOUT_USER_SUCCESS'
        ? rootReducer(undefined, action)
        : rootReducer(state, action)
    );