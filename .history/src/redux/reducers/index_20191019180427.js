import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import dataReducer from './dataReducer';
const rootReducer = combineReducers({
     Login: loginReducer
     Data: dataReducer
});

export default (state, action) => (
     rootReducer(state, action)
     );