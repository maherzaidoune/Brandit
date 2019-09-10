import { combineReducers } from 'redux';
import lo
const rootReducer = combineReducers({
	Login: loginReducer
});

export default (state, action) => (
     rootReducer(state, action)
     );