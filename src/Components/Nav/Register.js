import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { InputGroup, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import Scroll from 'react-scrollbar';
import Swal from 'sweetalert2';
import axios from 'axios';

function Register(props){
  const dispatch = useDispatch()

  const [UserName, setUserName] = useState('')
  const [State, setState] = useState('')
  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const [Verify, setVerify] = useState('')

  const [showStates, setShowStates] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const States = [
    "Alaska", "Alabama", "Arkansas", "Arizona", "California", "Colorado", "Connecticut", "Delaware", "Florida","Georgia",
    "Hawaii", "Iowa", "Idaho", "Illinois", "Indiana", "Kansas","Kentucky","Louisiana","Massachusetts","Maryland","Maine", 
    "Michigan", "Minnesota","Missouri", "Mississippi","Montana","North Carolina"," North Dakota","Nebraska","New Hampshire",
    "New Jersey", "New Mexico", "Nevada", "New York", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", 
    "South Dakota", "Tennessee", "Texas", "Utah", "Virginia", "Vermont", "Washington", "Wisconsin", "West Virginia", "Wyoming"
  ];

  const filteredStates = States.filter(state => state.toLowerCase().startsWith(State.toLowerCase()));
  const stateList = filteredStates.map((state, i) => (
    <div className='list-item' key={i} value={filteredStates[i] || `${state}`}  
      onClick={(e) => setState(filteredStates[i])/
      setShowStates(false)}
    >
    {showStates && state}
    </div>
  ));

  const registerUser = async (e) => {
    if(e.key === 'Enter'){
      if(Password !== Verify){ Swal.fire({title:'Passwords do not match'}) }
      if(State && Email && Password && UserName && Email.includes('@') && Verify === Password){
        const res = await axios.post('/auth/register', { State, UserName, Email, Password })
        if(!res.data){ Swal.fire({title: 'Login Failed', showConfirmButton: false, timer: 3000})}
        Swal.fire({type: 'success', title: 'you are logged in', showConfirmButton: false, timer: 2000, toast: true, position: 'top-end'})
        dispatch({type: 'LOGIN', payload: true})
        dispatch({type: 'UPDATE_USER', payload: res.data.userData})
        props.setShowRegister(false)
      }
    }
  };

  return(
    <div className='Register'>
      <div className='auth-box'>
        <h4 style={{textDecoration: 'underline'}}>Register</h4>
        <br/>
        <InputGroup>
          <FormControl 
            // style={{background: 'white'}}
            placeholder='State' 
            value={State} 
            onClick={() => setShowStates(true)} 
            onChange={e => setState(e.target.value)} 
            required
          />
        </InputGroup>
        {showStates && <Scroll className='list'>{stateList}</Scroll>}
        <br/> 
        <InputGroup>
          <FormControl 
            placeholder='username' 
            type='username' 
            value={UserName} 
            onChange={ e => setUserName(e.target.value)} 
            required
          />
          <FormControl 
            placeholder='Email' 
            type='email' 
            value={Email} 
            onChange={ e => setEmail(e.target.value)} 
            required
          />
        </InputGroup>
        <br/>
        <InputGroup>
          <FormControl 
            placeholder='password' 
            value={Password} 
            type={showPassword? 'text':'password'} 
            onChange={ e => setPassword(e.target.value)}
          />
          <FormControl 
            placeholder='verify password' 
            value={Verify} 
            type={showPassword? 'text':'password'} 
            onChange={e => setVerify(e.target.value)} 
            onKeyPress={e => registerUser(e)}
          />
        </InputGroup>
        <div className='show-password-icon'>
          <FontAwesomeIcon 
            icon={!showPassword? faEye: faEyeSlash} 
            onClick={() => setShowPassword(!showPassword)} 
            style={{fontSize: '35px', padding: 5, }}
          />
        </div>
        <br/>
        {'( press enter to submit )'}
      </div>
    </div>
  )
};

export default Register;