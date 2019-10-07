import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { InputGroup, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import Swal from 'sweetalert2';
import '../Nav/Nav.css'

function Login(props){
  const dispatch = useDispatch();

  const [UserName, setUserName] = useState('')
  const [Password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  
  const login = async (e) => {
    if(e.key === 'Enter'){
      const res = await axios.post('/auth/login', {UserName, Password})
      if(res.data.loggedIn){
        dispatch({type: 'LOGIN', payload: true})
        dispatch({type: 'UPDATE_USER', payload: res.data.userData})
        dispatch({type: 'CATCHES', payload: res.data.catches})
        setPassword('')
        setUserName('')
        props.setShowLogin(false)
        Swal.fire({type: 'success', title: 'logged in', showConfirmButton: false, timer: 1000})
      }
    }
  };

  return(
    <div className='Login'>
      <h4>Login</h4>
      <div className='auth-box'>
        <InputGroup className='mb-3'>
          <FormControl
            value={UserName}
            placeholder='username'
            onChange={e => setUserName(e.target.value)}
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <FormControl 
            value={Password} 
            placeholder='password' 
            type={!showPassword? 'password': 'text' } 
            onChange={e => setPassword(e.target.value)} 
            onKeyPress={e => login(e)} 
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
          />
        </InputGroup>
        <div className='show-password-icon'>
          <FontAwesomeIcon icon={!showPassword? faEye: faEyeSlash} 
            onClick={() => setShowPassword(!showPassword)} style={{fontSize: '35px', padding: 5, }}
          />
        </div>
        {'( press enter to submit )'}
        <br/>
      </div>
    </div>
  )
};

export default Login;