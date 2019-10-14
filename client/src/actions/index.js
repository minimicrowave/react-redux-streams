import streams from '../apis/streams';
import {
	SIGN_IN,
	SIGN_OUT,
	CREATE_STREAM,
	FETCH_STREAM,
	FETCH_STREAMS,
	DELETE_STREAM,
	EDIT_STREAM
} from './types';

const signIn = (userId) => {
	return {
		type: SIGN_IN,
		payload: userId
	};
};

const signOut = () => {
	return {
		type: SIGN_OUT
	};
};

const createStream = (formValues) => async (dispatch) => {
	const { data } = await streams.post('/streams', formValues);
	dispatch({ type: CREATE_STREAM, payload: data });
};

const fetchStreams = () => async (dispatch) => {
	const { data } = await streams.get('/streams');
	dispatch({ type: FETCH_STREAMS, payload: data });
};

const fetchStream = (id) => async (dispatch) => {
	const { data } = await streams.get(`/stream/${id}`);
	dispatch({ type: FETCH_STREAM, payload: data });
};

const editStream = (id, formValues) => async (dispatch) => {
	const { data } = await streams.put(`/stream/${id}`, formValues);
	dispatch({ type: EDIT_STREAM, payload: data });
};

const deleteStream = (id) => async (dispatch) => {
	await streams.delete(`/stream/${id}`);
	dispatch({ type: DELETE_STREAM, payload: id });
};

export { signIn, signOut, createStream, fetchStream, fetchStreams, editStream, deleteStream };
