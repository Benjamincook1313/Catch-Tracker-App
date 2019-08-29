import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Register from './Register'
import { Button } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';

function Login(){
  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.loggedIn)

  const [UserName, setUserName] = useState('')
  const [Password, setPassword] = useState('')

  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  
  const login = async (e) => {
    if(e.key === 'Enter'){
      const res = await axios.post('/auth/login', {UserName, Password})
      if(res.data.loggedIn){
        dispatch({type: 'LOGIN', payload: true})
        dispatch({type: 'UPDATE_USER', payload: res.data.userData})
        setPassword('')
        setShowLogin(false)
        setShowRegister(false)
      }
    }
  };

  const logout = async () => {
    let res = await axios.get('/auth/logout')
    if(!res.data.loggedIn){
      dispatch({type: 'LOGIN', payload: false})
      dispatch({type: 'UPDATE_USER', payload: {}})
      Swal.fire({title: 'logged out', showConfirmButton: false, timer: 3000})
    }
  };

  return(
    <div>
      {!loggedIn && 
        <div>
          <Button onClick={() => showLogin? setShowLogin(false): setShowLogin(true)/setShowRegister(false)}>login</Button>
          <Button onClick={() => showRegister? setShowRegister(false): setShowRegister(true)/setShowLogin(false)}>register</Button>
        </div> 
      }
      {loggedIn &&
        <button className='btn btn-dark' onClick={logout}>logout</button>
      }
      <br/>
      {showRegister && <Register setShowRegister={() => setShowRegister()}/>}
      {showLogin &&
        <div>
          UserName <input value={UserName} type='username' onChange={e => setUserName(e.target.value)} />
          Password <input value={Password} type='password' onChange={e => setPassword(e.target.value)} onKeyPress={e => login(e)}/>
          <Button variant='light' onClick={() => setShowLogin(false)}>x</Button>
        </div>
      }
    </div>
  )
};

export default Login;