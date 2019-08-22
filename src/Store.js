import { createStore, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise-middleware'
import reducer from './ducks/reducer';
// import userReducer from './ducks/userReducer'

// const rootReducer = combineReducers({
//   user: userReducer,
//   catches: catchReducer 
// })

export default createStore(reducer, applyMiddleware(promiseMiddleware));