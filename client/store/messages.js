import axios from 'axios';

const WRITE_MESSAGE = 'WRITE_MESSAGE';
const FETCH_MESSAGES = 'FETCH_MESSAGES';

export const _writeMessage = message => {
	return {
		type: WRITE_MESSAGE,
		message,
	};
};

export const _fetchMessages = messages => {
	return {
		type: FETCH_MESSAGES,
		messages,
	};
};

export const writeMessage = (message, roomId, userId) => {
	return async dispatch => {
		try {
			const { data: dbMessage } = await axios.post('/api/messages', {
				message,
				roomId,
				userId,
			});
			dispatch(_writeMessage(dbMessage.message));
		} catch (err) {
			console.log(err);
		}
	};
};

export const fetchMessages = roomId => {
	return async dispatch => {
		try {
			const { data: messages } = await axios.get(`/api/messages/${roomId}`);
			dispatch(_fetchMessages(messages));
		} catch (err) {
			console.log(err);
		}
	};
};

const reducer = (state = [], action) => {
	switch (action.type) {
		case WRITE_MESSAGE:
			return [...state, action.message];
		case FETCH_MESSAGES:
			return action.messages;
		default:
			return state;
	}
};

export default reducer;
