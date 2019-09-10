import { combineReducers } from 'redux';
const rootReducer = combineReducers({
	login
});

export default (state, action) => (
     rootReducer(state, action)
     );