
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
  catches: [],
  loggedIn: false,
  showForm: false,
  page: 0,
  day: today(),
  tod: 'morning',
  usState: '',
  waterType: 'River',
  waterName: '',
  weather: '',
  temp: '',
  fishType: 'trout',
  species: '',
  length: '',
  image: '',
  flyType: '',
  fly: '',
  size: '0',
  color: '',
  details: '',
  edit: '',
};

// authentication
export const LOGIN = 'LOGIN';
export const UPDATE_USER = 'UPDATE_USER';
export const CATCHES = 'CATCHES';
export const SHOW_FORM = 'SHOW_FORM'
// page
export const NEXT = 'NEXT';
export const BACK = 'BACK';
export const CLEAR_CATCH = 'CLEAR_CATCH';
// location component
export const DAY = 'DAY';
export const TOD = 'TOD';
export const US_STATE = 'US_STATE';
export const WATER_TYPE = 'WATER_TYPE';
export const WATER_NAME = 'WATER_NAME'
// weather component
export const WEATHER = 'WEATHER';
export const TEMP = 'TEMP';
// fish component
export const FISH_TYPE = 'FISH_TYPE';
export const SPECIES = 'SPECIES';
export const LENGTH = 'LENGTH';
export const IMAGE = 'IMAGE';
// fly component
export const FLY_TYPE = 'FLY_TYPE';
export const FLY = 'FLY';
export const SIZE = 'SIZE';
export const COLOR = 'COLOR'

export const DETAILS = 'DETAILS'
// Catch
export const EDIT_CATCH = 'EDIT_CATCH'
export const RESET = 'RESET'

export default function reducer(state = initialState, action){
  const { type, payload } = action
  switch(type) {
    case LOGIN:
      return {...state, loggedIn: payload? payload: false}
    case UPDATE_USER:
      return {...state, user: payload? payload: {}}
    case CATCHES:
      return {...state, catches: payload}
    case SHOW_FORM:
      return {...state, showForm: payload}
    case DAY:
      return {...state, day: payload}
    case TOD: 
      return {...state, tod: payload? payload: ''}
    case US_STATE: 
      return {...state, usState: payload? payload: ''}
    case WATER_TYPE:
      return {...state, waterType: payload? payload: ''}
    case WATER_NAME:
      return {...state, waterName: payload? payload: ''}
    case WEATHER:
      return {...state, weather: payload? payload: ''}
    case TEMP:
      return {...state, temp: payload? payload: ''}
    case FISH_TYPE: 
      return {...state, fishType: payload? payload: ''}
    case SPECIES:
      return {...state, species: payload? payload: ''}
    case LENGTH:
      return {...state, length: payload? payload: ''}
    case IMAGE:
      return {...state, image: payload? payload: ''}
    case FLY_TYPE:
      return {...state, flyType: payload? payload: ''}
    case FLY:
      return {...state, fly: payload? payload: ''}
    case SIZE:
      return {...state, size: payload? payload: ''}
    case COLOR:
      return {...state, color: payload? payload: ''}
    case DETAILS:
      return {...state, details: payload? payload: ''}
    case NEXT:
      return {...state, page:  state.page + 1}
    case BACK:
      return {...state, page: state.page - 1}
    case CLEAR_CATCH:
      return {
        ...state, showForm: false, page: 0, day: today(), tod: '', waterType: 'River', 
        waterName: '', weather: '', temp: '', fishType: 'trout', species: '', length: '', image: '', 
        flyType: '', fly: '', size: '', color: '', details: ''
      }  
    case EDIT_CATCH:
      let { date, tod, water_name, water_type, us_state, temperature, weather, image_url,
        length, fish_type, species, size, fly, fly_type, color, details 
        } = payload
      return {
        ...state, day: date, tod: tod, waterName: water_name, waterType: water_type, 
        usState: us_state, temp: temperature, weather: weather, length: length, image: image_url, fishType: fish_type,
        species: species, size: size, fly: fly, flyType: fly_type, color: color, details: details
      }
    case RESET:
      return{...initialState}
    default:
      return state
  }
};