import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Login from './Auth/Login';
import Register from './Auth/Register';
import FlyRod from './Fly-Rod/Fly-Rod';
import axios from 'axios';
import { Button, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import Settings from './Settings/Settings';
import Fish from '../../../Images/salmon.jpg';
import Swal from 'sweetalert2';
import './Nav.css';

function Nav(props){
  const dispatch = useDispatch()
  const loggedIn = useSelector(state => state.loggedIn)
  const User = useSelector(state => state.user)

  const [showLogin, setShowLogin] = useState(true)
  const [showRegister, setShowRegister] = useState(false)
  const [stBtn, setStBtn] = useState(false)
  const [settings, setSettings] = useState(false)

  const logout = async () => {
    let res = await axios.get('/auth/logout')
    if(!res.data.loggedIn){
      dispatch({type: 'LOGIN'})
      dispatch({type: 'UPDATE_USER'})
      Swal.fire({
        type: 'success', 
        title: 'logged out', 
        showConfirmButton: false, toast: true, timer: 1000, position: 'top'
      })
    }
  };

  return(
    <div className='Nav'>
      <img className='fish-img' src={Fish} alt='' width={280} onClick={() => setStBtn(!stBtn)} />
      {loggedIn? 
        <div onClick={() => setStBtn(!stBtn)}>
          <h3 className='name'>{`${User? User.user_name: null}`}</h3>
          {stBtn && 
            <h5 className='settings-btn' variant='light' 
              onClick={() => setSettings(true)/setStBtn(false)/dispatch({type: 'US_STATE', payload: User.state})}>
              settings
            </h5>
          }
        </div>: null
      }
      <div className='login-logout'>
        {loggedIn &&
          <Button className='logout-btn' size='sm' variant='dark' onClick={logout}>logout</Button>
        }
        
        {/* <h4 className='shop-btn'>shop</h4> */}
      </div>
      {!loggedIn && 
        <ToggleButtonGroup className='login-buttons' name='login-buttons' type='radio' defaultValue={1}>
          <ToggleButton variant='light'  value={1} onClick={() => setShowLogin(true)/setShowRegister(false)}>login</ToggleButton>            
          <ToggleButton variant='light'  value={2} onClick={() => setShowRegister(true)/setShowLogin(false)}>register</ToggleButton>
        </ToggleButtonGroup>
      }
      <h1 className='title'>Catch-Tracker
        <FlyRod />
      </h1> 
      {!loggedIn &&
        <div className='auth-wrapper'>
          {showLogin && <Login refresh={props.refresh} setShowLogin={() => setShowLogin(true)}/>}
          {showRegister && <Register setShowRegister={() => setShowRegister(false)}/>}
        </div>
      }
      {settings &&
        <Settings setSettings={() => setSettings(false)} refresh={props.refresh}/>
      }
    </div>
  )
};

export default Nav;