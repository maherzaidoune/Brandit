import { combineReducers } from 'redux';
const rootReducer = combineReducers({
	loginReduce
});

export default (state, action) => (
     rootReducer(state, action)
     );