import {
	CREATE_STREAM,
	FETCH_STREAM,
	FETCH_STREAMS,
	EDIT_STREAM,
	DELETE_STREAM
} from '../actions/types';
import _ from 'lodash';

export default (state = {}, { type, payload }) => {
	switch (type) {
		case CREATE_STREAM:
			return { ...state, [payload.id]: payload };
		case FETCH_STREAM:
			return { ...state, [payload.id]: payload };
		case EDIT_STREAM:
			return { ...state, [payload.id]: payload };
		case FETCH_STREAMS:
			return { ...state, ..._.mapKeys(payload, 'id') };
		case DELETE_STREAM:
			return _.omit(state, payload);
		default:
			return state;
	}
};
