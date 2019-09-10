import { combineReducers } from 'redux';
import loginReducer from './loginReducer'
const rootReducer = combineReducers({
	Login: loginReducer
});

export default (state, action) => (
     rootReducer(state, action)
     );