import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import Nav from './Components/Navbar/Nav/Nav'
import Location from './Components/Catch/Location/Location';
import Weather from './Components/Catch/Weather/Weather';
import Fish from './Components/Catch/Fish/Fish';
import Fly from './Components/Catch/Fly/Fly';
import ReviewCatch from './Components/Catch/ReviewCatch/ReviewCatch';
import UserCatches from './Components/User/UserCatches';
import River from './Images/River.mp4'
import axios from 'axios';
import './App.css';
import './Components/Catch/Catch.css'
// import Swal from 'sweetalert2';

function App() {;
  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.loggedIn)
  const page = useSelector(state => state.page)
  const showForm = useSelector(state => state.showForm)
  const [refresh, setRefresh] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if(!mounted){
        axios.get('/auth/checkForUser').then(res => {
          if(res.data.user){
            dispatch({type: 'LOGIN', payload: true})
            dispatch({type: 'UPDATE_USER', payload: res.data.user})
            dispatch({type: 'CATCHES', payload: res.data.catches})
            setMounted(true)
          }
        })
      }
    return () => {};
  }, [dispatch, mounted]);

  const form = [
    <Location />, 
    <Weather />, 
    <Fish />, 
    <Fly />,
    <ReviewCatch setRefresh={() => setRefresh(!refresh)}/>
  ];

  return (
    <div className="App" >
      <video className='background-video'  src={River} autoPlay={true} loop muted/>
      <div className='hidden'></div>
      <Nav />
      <br/>
      {loggedIn &&
        <div className='fish-on'>
          {!showForm && 
            <Button variant='light' onClick={() => dispatch({type: 'SHOW_FORM', payload: true})}>
              ^-^ Fish On!!! ^-^
            </Button>
          }
          {showForm && <Button variant='dark' onClick={() => dispatch({type: 'SHOW_FORM', payload: false})/dispatch({type: 'CLEAR_CATCH'})}>Fish Off!</Button>}
          {showForm && <div className='form-page-wrapper'>{form[page]}</div> }
        </div>
      }
      <br/>
      {loggedIn && <UserCatches setRefresh={() => setMounted(false)}/>}
      {loggedIn &&
        <footer className='footer'></footer>
      }  
      <footer></footer>
    </div>
  );
};

export default App;
