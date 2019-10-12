import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Login from './Login';
import Register from './Register';
import FlyRod from './Fly-Rod/Fly-Rod';
import axios from 'axios';
import { Button, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faWater } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2'
import './Nav.css';

function Nav(){
  const dispatch = useDispatch()
  const loggedIn = useSelector(state => state.loggedIn)
  const User = useSelector(state => state.user)

  const [showLogin, setShowLogin] = useState(true)
  const [showRegister, setShowRegister] = useState(false)

  const logout = async () => {
    let res = await axios.get('/auth/logout')
    if(!res.data.loggedIn){
      dispatch({type: 'LOGIN', payload: false})
      dispatch({type: 'UPDATE_USER'})
      Swal.fire({type: 'success', title: 'logged out', showConfirmButton: false, toast: true, timer: 1000, position: 'top-end'})
    }
  };
  // <FontAwesomeIcon className='water' icon={faWater} />

  return(
    <div className='Nav'>
      <div className='nav-items'>
        {loggedIn? 
          <h3 className='name' >
            {`Hello, ${User? User.user_name: ''}`} 
          </h3>: <h3>''</h3>
        }
        {loggedIn &&
          <Button variant='dark' onClick={logout}>logout</Button>
        }
        {!loggedIn && 
          <ToggleButtonGroup className='login-buttons' name='login-buttons' type='radio' defaultValue={1}>
            <ToggleButton variant='light' value={1} onClick={() => setShowLogin(true)/setShowRegister(false)}>login</ToggleButton>
            <ToggleButton variant='light' value={2} onClick={() => setShowRegister(true)/setShowLogin(false)}>register</ToggleButton>
          </ToggleButtonGroup>
        }
      </div>
      <h1 className='title'>Catch-Tracker
        <FlyRod />
      </h1> 
      {!loggedIn &&
        <div className='auth-wrapper'>
          {showLogin && <Login setShowLogin={() => setShowLogin()}/>}
          {showRegister && <Register setShowRegister={() => setShowRegister()} />}
        </div>
      }
    </div>
  )
};

export default Nav;