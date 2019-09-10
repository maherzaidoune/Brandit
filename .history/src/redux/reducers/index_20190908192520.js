import { combineReducers } from 'redux';
import 
const rootReducer = combineReducers({
	Login: loginReducer
});

export default (state, action) => (
     rootReducer(state, action)
     );