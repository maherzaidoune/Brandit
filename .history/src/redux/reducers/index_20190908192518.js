import { combineReducers } from 'redux';
imp
const rootReducer = combineReducers({
	Login: loginReducer
});

export default (state, action) => (
     rootReducer(state, action)
     );