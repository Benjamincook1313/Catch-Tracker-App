import { createStore, applyMiddleware, /*combineReducers*/} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import catchReducer from './ducks/reducer';
// import userReducer from './ducks/userReducer';

// const rootReducer = combineReducers({
//   user: userReducer,
//   catch: catchReducer 
// });

export default createStore(catchReducer, applyMiddleware(promiseMiddleware));