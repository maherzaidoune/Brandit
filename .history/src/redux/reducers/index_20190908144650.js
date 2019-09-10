import { combineReducers } from 'redux';
const rootReducer = combineReducers({
	Login: LoginPageReducer,
	Signup: SignupReducer,
	Posting: PostReducer,
	Event: EventReducer,
	Network: NetworkReducer,
	Profile: ProfileReducer,
	ReportData: ReportReducer,
	Groups: GroupsReducer,
	Message: MessagesReducer
});