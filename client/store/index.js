import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import room from './room';
import auth from './auth';
import allRooms from './allRooms';
import spotifyAuth from './spotifyAuth';
import video from './video';
import videoQueue from './videoQueue';
import userRoom from './userRoom';
import messages from './messages';

// const reducer = combineReducers({ auth })
const reducer = combineReducers({
	auth,
	room,
	allRooms,
	spotifyAuth,
	video,
	videoQueue,
	userRoom,
	messages,
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
export * from './userRoom';
export * from './messages';
