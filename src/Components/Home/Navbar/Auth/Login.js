import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { InputGroup, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2';
import axios from 'axios';

function Login(props){
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  
  const login = async (e) => {
    if(e.key === 'Enter'){
      const res = await axios.post('/auth/login', {userName, password})
      if(res.data.loggedIn){
        dispatch({type: 'LOGIN', payload: true})
        dispatch({type: 'UPDATE_USER', payload: res.data.userData})
        dispatch({type: 'CATCHES', payload: res.data.catches})
        setPassword('')
        setUserName('')
        Swal.fire({type: 'success', title: 'logged in', showConfirmButton: false, timer: 1500})
      }else{
        Swal.fire({type: 'warning', title: `${res.data.message}`, showConfirmButton: false, timer: 2000})
      }
    }
  };

  return(
    <div className='Login'>
      <div className='auth-box'>
      <h4 style={{textDecoration: 'underline'}}>Login</h4>
      <br/>
        <InputGroup className='mb-3'>
          <FormControl
            value={userName}
            placeholder='Username'
            onChange={e => setUserName(e.target.value)}
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <FormControl 
            value={password} 
            placeholder='Password' 
            type={!showPass? 'password': 'text' } 
            onChange={e => setPassword(e.target.value)} 
            onKeyPress={e => login(e)} 
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
          />
          <InputGroup.Append id='basic-addon2' >
              <InputGroup.Text>
                <FontAwesomeIcon icon={!showPass? faEye: faEyeSlash} onClick={() => setShowPass(!showPass)}/>
              </InputGroup.Text>
            </InputGroup.Append>
        </InputGroup>
        {'( press enter to submit )'}
      </div>
    </div>
  )
};

export default Login;