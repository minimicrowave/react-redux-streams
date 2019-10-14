import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import auth from './authReducer';
import stream from './streamReducer';

export default combineReducers({
	auth,
	form,
	stream
});
