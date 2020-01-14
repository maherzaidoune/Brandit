import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import dataReducer from './dataReducer';
import SettingReducer from './SettingReducer';
const rootReducer = combineReducers({
     Login: loginReducer,
     Data: dataReducer,
     Settings: SettingReducer
});

export default (state, action) => (
     rootReducer(state, action)
     );