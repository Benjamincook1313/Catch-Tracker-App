
const initialState = {
  user: {},
  loggedIn: false,
  page: 0,
  date: {},
  tod: '',
  location: {},
  wheather: {},
  fish: {},
  fly: {},
};

export const LOGOUT = 'LOGOUT'
export const LOGIN = 'LOGIN'
export const NEXT = 'NEXT';
export const BACK = 'BACK';
export const DATE = 'DATE';
export const TOD = 'TOD';
export const LOCATION = 'LOCATION';
export const WHEATHER = 'WHEATHER';
export const FISH = 'FISH';
export const FLY = 'Fly';

export default function reducer(state = initialState, action){
  const { type, payload } = action
  switch(type) {
    case DATE:
      return {...state, Date: payload}
    case TOD: 
      return {...state, TOD: payload}
    case LOCATION: 
      return {...state, Location: payload}
    case WHEATHER:
      return {...state, WheatherInfo: payload}
    case FISH: 
      return {...state, FishInfo: payload}
    case FLY:
      return {...state, FlyInfo: payload}
    case NEXT:
      return {...state, page:  state.page + 1}
    case BACK:
      return {...state, page: state.page - 1}
    case LOGIN:
      return {...state, loggedIn: true}
    case LOGOUT:
      return {...state, loggedIn: false}
    default:
      return state
  }
};