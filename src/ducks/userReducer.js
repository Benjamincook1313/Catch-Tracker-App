import axios from 'axios';

const initialState = {
  user: {},
  loggedIn: false,
}

export const UPDATE_USER = 'UPDATE_USER';
export const LOGOUT = 'LOGOUT';

export function register(user) {
  let data = axios.post('/auth/register', user).then(res => res.data)
  return {
    type: UPDATE_USER,
    payload: data
  }
};

export function login(user){
  let data = axios.post('/auth/login', user).then(res => res.data)
  return {
    type: UPDATE_USER,
    payload: data,
  }
};

export function checkForUser() {
  let data = axios.get('/auth/checkForUser').then(res => res.data)
  return {
    type: UPDATE_USER,
    payload: data
  }
};

export function logout() {
  let data = axios.get('/auth/logout').then(res => res.data)
  return {
    type: LOGOUT,
    payload: data
  }
};

export default function reducer(state = initialState, action){
  const { type, payload } = action
  switch(type){
    case UPDATE_USER:
      return {...state, user: payload, loggedIn: true}
    case LOGOUT:
      return {...state, user: payload, loggedIn: false}
    default:
      return state
  }
}