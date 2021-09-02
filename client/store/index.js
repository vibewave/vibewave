import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import room from './room';
import auth from './auth';
import allRooms from './allRooms';
import spotifyAuth from './spotifyAuth';
import track from './track';
import trackQueue from './trackQueue';
import messages from './messages';

// const reducer = combineReducers({ auth })
const reducer = combineReducers({
	auth,
	room,
	allRooms,
	spotifyAuth,
	track,
	trackQueue,
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
export * from './trackQueue';
export * from './track';
export * from './messages';
