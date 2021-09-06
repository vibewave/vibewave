import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import room from './room';
import auth from './auth';
import allRooms from './allRooms';
import video from './video';
import videoQueue from './videoQueue';
import users from './users';
import messages from './messages';
import host from './host';
import thumbnails from './thumbnails';
import requestedVideo from './requestedVideo';
import requestedVideos from './requestedVideos';

const reducer = combineReducers({
	auth,
	room,
	allRooms,
	video,
	videoQueue,
	users,
	messages,
	host,
	thumbnails,
	requestedVideo,
	requestedVideos,
});

// const middlewares = [
// 	thunkMiddleware,
// ];
// if (process.env.NODE_ENV !== 'production') {
// 	const reduxLogger = createLogger({ collapsed: true });
// 	middlewares.push(reduxLogger);
// }

const middleware = composeWithDevTools(
	applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;

export * from './auth';
export * from './room';
export * from './allRooms';
export * from './videoQueue';
export * from './video';
export * from './users';
export * from './messages';
export * from './host';
export * from './thumbnails';
export * from './requestedVideo';
export * from './requestedVideos';
