import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import Login from './Components/Login/Login';
import Location from './Components/Catch/Location/Location';
import Weather from './Components/Catch/Weather/Weather';
import Fish from './Components/Catch/Fish/Fish';
import Fly from './Components/Catch/Fly/Fly';
import ReviewCatch from './Components/Catch/ReviewCatch/ReviewCatch';
import UserCatches from './Components/User/UserCatches';
import axios from 'axios';
import './App.css';

function App() {;
  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.loggedIn)
  const User = useSelector(state => state.user)
  const page = useSelector(state => state.page);
  const state = useSelector(state => state.usState)
  console.log(state)
  
  const ShowForm = useSelector(state => state.showForm);

  useEffect(() => {
    axios.get('/auth/checkForUser').then(res => {
      if(res.data.userData){
        dispatch({type: 'LOGIN', payload: true})
        dispatch({type: 'UPDATE_USER', payload: res.data.userData})
        dispatch({type: 'US_STATE', payload: res.data.userData.state})
      }
      axios.get('/api/catches').then(res => {
        dispatch({type: 'CATCHES', payload: res.data})
      })
    })
  }, [dispatch]);

  const Form = [
    <Location />, 
    <Weather />, 
    <Fish />, 
    <Fly />,
    <ReviewCatch />
  ];

  return (
    <div className="App" 
      style={{
        height: '100vh',
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
      }}>
      <div>
        {loggedIn && `Hello, ${User? User.user_name: ''} Welcome to your`}
        <h1>Catch - Tracker</h1> 
      </div>
      <div>
        <Login />
      </div>
      <br/>
      {loggedIn &&
        <div className='user-data'>
          {!ShowForm && <Button variant='dark' onClick={() => dispatch({type: 'SHOW_FORM', payload: true})}>^-^ Fish On!!! ^-^</Button>}
          {ShowForm && <Button variant='dark' onClick={() => dispatch({type: 'SHOW_FORM', payload: false})/ dispatch({type: 'CLEAR_CATCH'})}>Fish Off!</Button>}
          {ShowForm && <div>{Form[page]}</div> }
        </div>
      }
      {loggedIn && <UserCatches/>}
    </div>
  );
};

export default App;
