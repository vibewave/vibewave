import axios from 'axios';

const TOKEN = 'token';

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH';

/**
 * ACTION CREATORS
 */
const setAuth = auth => ({ type: SET_AUTH, auth });

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
	try {
		const token = window.localStorage.getItem(TOKEN);
		if (token) {
			const res = await axios.get(`/auth/me`, {
				headers: {
					authorization: token,
				},
			});
			return dispatch(setAuth(res.data));
		}
	} catch (err) {
		return dispatch(setAuth({ error: err }));
	}
};

export const authenticate = (method, userInfo) => async dispatch => {
	try {
		const res = await axios.post(`/auth/${method}`, userInfo);
		window.localStorage.setItem(TOKEN, res.data.token);
		dispatch(me());
	} catch (authError) {
		return dispatch(setAuth({ error: authError }));
	}
};

export const logout = () => {
	window.localStorage.removeItem(TOKEN);
	// history.push('/login');
	return {
		type: SET_AUTH,
		auth: {},
	};
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
	switch (action.type) {
		case SET_AUTH:
			return action.auth;
		default:
			return state;
	}
}
