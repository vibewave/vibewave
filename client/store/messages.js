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
			dispatch(fetchMessages(roomId));
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

export const parseDate = messageDate => {
	var systemDate = new Date(Date.parse(messageDate));
	var userDate = new Date();
	var diff = Math.floor((userDate - systemDate) / 1000);
	if (diff <= 1) {return 'just now';}
	if (diff < 20) {return diff + ' seconds ago';}
	if (diff < 40) {return 'half a minute ago';}
	if (diff < 60) {return 'less than a minute ago';}
	if (diff <= 90) {return 'one minute ago';}
	if (diff <= 3540) {return Math.round(diff / 60) + ' minutes ago';}
	if (diff <= 5400) {return '1 hour ago';}
	if (diff <= 86400) {return Math.round(diff / 3600) + ' hours ago';}
	if (diff <= 129600) {return '1 day ago';}
	if (diff < 604800) {return Math.round(diff / 86400) + ' days ago';}
	if (diff <= 777600) {return '1 week ago';}
	return 'on ' + systemDate;
}

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
