import streams from '../apis/streams';
import history from '../history';
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

const createStream = (formValues) => async (dispatch, getState) => {
	const { userId } = getState().auth;
	const { data } = await streams.post('/streams', { ...formValues, userId });
	dispatch({ type: CREATE_STREAM, payload: data });
	history.push('/');
};

const fetchStreams = () => async (dispatch) => {
	const { data } = await streams.get('/streams');
	dispatch({ type: FETCH_STREAMS, payload: data });
};

const fetchStream = (id) => async (dispatch) => {
	const { data } = await streams.get(`/streams/${id}`);
	dispatch({ type: FETCH_STREAM, payload: data });
};

const editStream = (id, formValues) => async (dispatch) => {
	const { data } = await streams.patch(`/streams/${id}`, formValues);
	dispatch({ type: EDIT_STREAM, payload: data });
	history.push('/');
};

const deleteStream = (id) => async (dispatch) => {
	await streams.delete(`/streams/${id}`);
	dispatch({ type: DELETE_STREAM, payload: id });
};

export { signIn, signOut, createStream, fetchStream, fetchStreams, editStream, deleteStream };
