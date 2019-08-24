
function today(){
  let month = new Date().getMonth()+1
  let day = new Date().getDate()
  let year = new Date().getFullYear()
  return `${year}-${month<10? `0${month}`: month}-${day<10? `0${day}`: day}`
};

const initialState = {
  user: {},
  loggedIn: false,
  page: 0,
  day: today(),
  tod: '',
  usState: '',
  waterType: '',
  waterName: '',
  wheather: '',
  temp: '',
  fishType: '',
  species: '',
  flyType: '',
  fly: ''
};

// authentication
export const LOGOUT = 'LOGOUT';
export const LOGIN = 'LOGIN';
export const UPDATE_USER = 'UPDATE_USER';

export const NEXT = 'NEXT';
export const BACK = 'BACK';
export const CLEAR_CATCH= 'CLEAR_CATCH';

// location component
export const DAY = 'DAY';
export const TOD = 'TOD';
export const US_STATE = 'US_STATE';
export const WATER_TYPE = 'WATER_TYPE';
export const WATER_NAME = 'WATER_NAME'
// wheather component
export const WHEATHER = 'WHEATHER';
export const TEMP = 'TEMP';
// fish component
export const FISH_TYPE = 'FISH_TYPE';
export const SPECIES = 'SPECIES';
// fly component
export const FLY_TYPE = 'FLY_TYPE';
export const FLY = 'Fly';

export default function reducer(state = initialState, action){
  const { type, payload } = action
  switch(type) {
    case LOGIN:
      return {...state, loggedIn: true}
    case LOGOUT:
      return {...state, loggedIn: false}
    case UPDATE_USER:
      return {...state, user: payload}
    case DAY:
      return {...state, day: payload}
    case TOD: 
      return {...state, tod: payload}
    case US_STATE: 
      return {...state, usState: payload}
    case WATER_TYPE:
      return {...state, waterType: payload}
    case WATER_NAME:
      return {...state, waterName: payload}
    case WHEATHER:
      return {...state, wheather: payload}
    case TEMP:
      return {...state, temp: payload}
    case FISH_TYPE: 
      return {...state, fishType: payload}
    case SPECIES:
      return {...state, species: payload}
    case FLY_TYPE:
      return {...state, flyType: payload}
    case FLY:
      return {...state, fly: payload}
    case NEXT:
      return {...state, page:  state.page + 1}
    case BACK:
      return {...state, page: state.page - 1}
    case CLEAR_CATCH:
      return {initialState}
    default:
      return state
  }
};