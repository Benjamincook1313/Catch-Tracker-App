import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Login from './Components/Login';
import Catch from './Components/Catch/Catch';
import UserCatches from './Components/UserCatches';
import axios from 'axios';
// import styled, { css } from 'styled-components';
import './App.css';

function App() {;
  const loggedIn = useSelector(state => state.loggedIn)
  const User = useSelector(state => state.user)
  const dispatch = useDispatch();
  const [ShowForm, setShowForm] = useState(false);

  useEffect(() => {
    axios.get('/auth/checkForUser').then(res => {
      if(res.data.userData){
        dispatch({type: 'LOGIN'})
        dispatch({type: 'UPDATE_USER', payload: res.data.userData})
      }
    })
  }, [dispatch]);

  return (
    <div className="App" 
      style={{
        height: '100vh',
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
      }}
      >
      <div>
        {loggedIn && `Hello, ${User? User.firstname: ''} ${User? User.lastname: ''} Welcome to your`}
        <h1>Catch - Tracker</h1> 
      </div>
      <div>
        <Login />
      </div>
      <br/>
      {loggedIn &&
        <div className='user-data'>
          {!ShowForm && <button className='btn btn-dark' onClick={() => setShowForm(true)}>^-^ Fish On!!! ^-^</button>}
          {ShowForm && <button className='btn btn-dark' onClick={() => setShowForm(false)/ dispatch({type: 'CLEAR_CATCH'})}>Fish Off!</button>}
          {ShowForm && <div> <Catch/> </div> }
          <UserCatches/>
        </div>
      }
    </div>
  );
};

export default App;
