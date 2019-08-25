
function today(){
  let month = new Date().getMonth()+1
  let day = new Date().getDate()
  let year = new Date().getFullYear()
  switch(month){
    case 1: month = 'Jan'
      break;
    case 2: month = 'Feb'
      break;
    case 3: month = 'Mar'
      break;
    case 4: month = 'Apr'
      break;
    case 5: month = 'May'
      break;
    case 6: month = 'June'
      break;
    case 7: month = 'July'
      break;
    case 8: month = 'Aug'
      break;
    case 9: month = 'Sept'
      break;
    case 10: month = 'Oct'
      break;
    case 11: month = 'Nov'
      break;
    case 12: month = 'Dec'
      break;
      default: 
    }
  return `${month<10? 0+month: month} ${day<10? 0+day: day}, ${year}`
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
  image: '',
  flyType: '',
  fly: ''
};

// authentication
export const LOGOUT = 'LOGOUT';
export const LOGIN = 'LOGIN';
export const UPDATE_USER = 'UPDATE_USER';
// page
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
export const IMAGE = 'IMAGE';
// fly component
export const FLY_TYPE = 'FLY_TYPE';
export const FLY = 'FLY';

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
      return {...state, usState: payload? payload: ''}
    case WATER_TYPE:
      return {...state, waterType: payload? payload: ''}
    case WATER_NAME:
      return {...state, waterName: payload? payload: ''}
    case WHEATHER:
      return {...state, wheather: payload? payload: ''}
    case TEMP:
      return {...state, temp: payload? payload: ''}
    case FISH_TYPE: 
      return {...state, fishType: payload? payload: ''}
    case SPECIES:
      return {...state, species: payload? payload: ''}
    case FLY_TYPE:
      return {...state, flyType: payload? payload: ''}
    case FLY:
      return {...state, fly: payload? payload: ''}
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