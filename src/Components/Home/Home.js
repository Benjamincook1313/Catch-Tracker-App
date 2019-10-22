import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import Nav from './Navbar/Nav';
import Location from './Catch/Location/Location';
import Weather from './Catch/Weather/Weather';
import Fish from './Catch/Fish/Fish';
import Fly from './Catch/Fly/Fly';
import ReviewCatch from './Catch/ReviewCatch/ReviewCatch';
import River from '../../Images/River.mp4';
import Carousel from './User/Carousel./Carousel';
import Catch from './User/Catches.js/Catch';
import axios from 'axios';
import './Catch/Catch.css';
import './Home.css';
import './User/User.css'

function Home(props) {;
  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.loggedIn)
  const page = useSelector(state => state.page)
  const showForm = useSelector(state => state.showForm)
  const Catches = useSelector(state => state.catches)

  const [mounted, setMounted] = useState(false)
  const [showAll, setShowAll] = useState(false)

  let userCatch = Catches? Catches.map((userCatch, i) => {
    return (
      <Catch key={i} userCatch={userCatch} refresh={() => setMounted(false)} />
    )
  }): null;

  useEffect(() => {
    if(!mounted){
      axios.get('/auth/checkForUser').then(res => {
        if(res.data.user){
          dispatch({type: 'LOGIN', payload: true})
          dispatch({type: 'UPDATE_USER', payload: res.data.user})
          dispatch({type: 'CATCHES', payload: res.data.catches})
          dispatch({type: 'US_STATE', payload: res.data.user.state})
          setMounted(true)
        }
      })
    }
  }, [dispatch, mounted]);

  const form = [
    <Location />, 
    <Weather />, 
    <Fish />, 
    <Fly />,
    <ReviewCatch refresh={() => setMounted(false)}/>
  ];

  return (
    <div className="Home" >
      <video className='background-video'  src={River} autoPlay={true} loop muted/>
      <div className='hidden'></div> 
      <Nav refresh={() => setMounted(false)}/>
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
      {loggedIn && 
        <div className='UserCatches' >
          <div className='carousel-wrapper'>
            {Catches? 
              <Carousel />:
              <h4>5 most recent catches</h4>
            }
          </div>
          <Button variant='light' onClick={() => setShowAll(!showAll)}>All Catches</Button>
          <br/>
          {showAll &&
            <div className='userCatch'>
              {userCatch}
            </div>
          }
        </div>
      }
      {loggedIn &&
        <footer className='footer'></footer>
      }  
      <footer></footer>
    </div>
  );
};

export default Home;