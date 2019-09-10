import { combineReducers } from 'redux';
import loginReducer from './'
const rootReducer = combineReducers({
	Login: loginReducer
});

export default (state, action) => (
     rootReducer(state, action)
     );