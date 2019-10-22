import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { InputGroup, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2';
import axios from 'axios';

function Login(props){
  const dispatch = useDispatch()
  const { refresh } = props

  const [email, setEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [showReset, setShowReset] = useState(false)
  const [showEmail, setShowEmail] = useState(false)
  
  const login = async (e) => {
    if(e.key === 'Enter'){
      const res = await axios.post('/auth/login', {userName, password})
      if(res.data.loggedIn){
        dispatch({type: 'LOGIN', payload: true})
        dispatch({type: 'UPDATE_USER', payload: res.data.userData})
        dispatch({type: 'CATCHES', payload: res.data.catches})
        setPassword('')
        setUserName('')
        dispatch({type: 'TEMP_PASS'})
        Swal.fire({type: 'success', title: 'logged in', showConfirmButton: false, timer: 1500})
        refresh()
      }else{
        Swal.fire({type: 'warning', title: `${res.data.message}`, showConfirmButton: false, timer: 1500})
        setShowReset(true)
      }
    }
  };

  const forgotPass = async(e)=>{
    if(e.key === 'Enter'){
      const res = await axios.post('/auth/forgotPass', {email})
      if(res.data.message){
        Swal.fire({type: 'warning', title: `${res.data.message}`, timer: 2000, showConfirmButton: false})
      }else{
        Swal.fire({type: 'info', title: `temperary password sent to ${email}`, timer: 2000, showConfirmButton: false})
      }
    }
  };

  return(
    <div className='Login'>
      <div className='auth-box'>
      {showEmail?
        <h4 style={{textDecoration: 'underline'}}>Forgot Password?</h4>:
        <h4 style={{textDecoration: 'underline'}}>Login</h4>
      }
      <br/>
        {!showEmail &&
          <div>
            <InputGroup className='mb-3'>
              <FormControl
                value={userName}
                placeholder='Username'
                onChange={e => setUserName(e.target.value)}
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
              />
            </InputGroup>
            <InputGroup className='input'>
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
          </div>
        }
        {showEmail &&
          <div style={{postition: 'relative'}}>
            <div className='x-btn' style={{marginRight: 5, cursor: 'pointer'}} onClick={() => setShowEmail(false)} >X</div>
            <FormControl className='mb-3' placeholder='Enter Email' onChange={e => setEmail(e.target.value)} onKeyPress={e => forgotPass(e)} />
          </div>
        }
        {'( press enter to submit )'}
        {(showReset && !showEmail) &&
          <h6 className='forgot-p' onClick={() => setShowEmail(true)} >forgot password?</h6>
        }
      </div>
    </div>
  )
};

export default Login;