import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import Nav from './Components/Nav/Nav'
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
  // const User = useSelector(state => state.user)
  const page = useSelector(state => state.page)
  const ShowForm = useSelector(state => state.showForm)

  useEffect(() => {
    let f = async function(){
      await axios.get('/auth/checkForUser').then(res => {
        if(res.data.userData){
          dispatch({type: 'LOGIN', payload: true})
          dispatch({type: 'UPDATE_USER', payload: res.data.userData})
          dispatch({type: 'US_STATE', payload: res.data.userData.state})
        }
      })
    }
    f().then(res => 
      axios.get('/api/catches').then(res => {
        dispatch({type: 'CATCHES', payload: res.data})
      })  
    )
  }, [dispatch]);

  const Form = [
    <Location />, 
    <Weather />, 
    <Fish />, 
    <Fly />,
    <ReviewCatch />
  ];

  return (
    <div className="App">
      <div>
        <Nav />
      </div>
      <br/>
      {loggedIn &&
        <div className='user-data'>
          {!ShowForm && <Button variant='dark' onClick={() => dispatch({type: 'SHOW_FORM', payload: true})}>^-^ Fish On!!! ^-^</Button>}
          {ShowForm && <Button variant='dark' onClick={() => dispatch({type: 'SHOW_FORM', payload: false})/ dispatch({type: 'CLEAR_CATCH'})}>Fish Off!</Button>}
          {ShowForm && <div className='form-page-wrapper'>{Form[page]}</div> }
        </div>
      }
      {loggedIn && <UserCatches/>}
    </div>
  );
};

export default App;
