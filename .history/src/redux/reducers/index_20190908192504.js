import { combineReducers } from 'redux';
const rootReducer = combineReducers({
	loginReducer
});

export default (state, action) => (
     rootReducer(state, action)
     );