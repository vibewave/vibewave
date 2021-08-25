import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import room from './room';
import auth from './auth';
import allRooms from './allRooms';

// const reducer = combineReducers({ auth })
const reducer = combineReducers({ auth, room, allRooms });
const middleware = composeWithDevTools(
	applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;

export * from './auth';
export * from './room';
export * from './allRooms';