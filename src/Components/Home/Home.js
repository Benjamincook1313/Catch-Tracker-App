import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import Nav from './Navbar/Nav';
import Location from './Catch/Location';
import Weather from './Catch/Weather';
import Fish from './Catch/Fish';
import Fly from './Catch/Fly';
import ReviewCatch from './Catch/ReviewCatch';
import River from '../../Images/River.mp4';
import Buddies from './Buddies/Buddies';
import Carousel from './User/Carousel/Carousel';
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
  const User = useSelector(state => state.user)

  const [refresh, setRefresh] = useState(false)
  const [selected, setSelected] = useState(0)

  let userCatch = Catches? Catches.map((userCatch, i) => {
    return (
      <Catch key={i} userCatch={userCatch} refresh={() => setRefresh(!refresh)} />
    )
  }): null;

  useEffect(() => {
    let mounted = false
    if(!mounted){
      axios.get('/auth/checkForUser').then(res => {
        if(res.data.user){
          dispatch({type: 'LOGIN', payload: true})
          dispatch({type: 'UPDATE_USER', payload: res.data.user})
          dispatch({type: 'CATCHES', payload: res.data.catches})
          dispatch({type: 'US_STATE', payload: res.data.user.state})
        }
      })
    }
    return () => {
      if(!mounted){
        mounted = true
      }
    }
  }, [dispatch, refresh]);

  const form = [
    <Location />, 
    <Weather />, 
    <Fish />, 
    <Fly />,
    <ReviewCatch refresh={() => setRefresh(!refresh)}/>
  ];

  const section = [
    <Carousel />,
    <div className='userCatch'>{userCatch}</div>,
    <Buddies />
  ]

  return (
    <div className="Home" >
      <video className='background-video'  src={River} autoPlay={true} loop muted/>
      <div className='hidden'></div> 
      <Nav refresh={() => setRefresh(false)}/>
      <br/>
      {loggedIn &&
        <div className='fish-on'>
          {(selected === 2)?
            <Button variant='secondary' onClick={() => setSelected(0)/dispatch({type: 'SHOW_FORM'})}>Carousel</Button>:
            <Button variant='secondary' onClick={() => setSelected(2)/dispatch({type: 'SHOW_FORM'})} disabled>Buddies</Button>
          }
          {!showForm && 
            <Button className='fish-on-btn' variant='light' size='lg' onClick={() => dispatch({type: 'SHOW_FORM', payload: true})} >
              Fish On!!!
            </Button>
          }
          {showForm && 
            <Button variant='dark' size='lg' onClick={() => dispatch({type: 'SHOW_FORM', payload: false})/dispatch({type: 'CLEAR_CATCH'})/dispatch({type: 'US_STATE', payload: User.state})}>
              Fish Off!
            </Button>
          }
          {(selected === 1)?
            <Button variant='secondary' onClick={() => setSelected(0)/dispatch({type: 'SHOW_FORM'})}>Carousel</Button>:
            <Button variant='secondary' onClick={() => setSelected(1)/dispatch({type: 'SHOW_FORM'})}>Catches</Button>
          }
        </div>
      }
      {loggedIn && 
        <div className='UserCatches' >
          {showForm && <div className='form-page-wrapper'>{form[page]}</div> }
          {(Catches && !showForm) && 
            section[selected]
          }
          <br/>
        </div>
      }
      {/* {Catches && 
         <footer className='footer'></footer>
      } */}
      <footer></footer>
    </div>
  );
};

export default Home;