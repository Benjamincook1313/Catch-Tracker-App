import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
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
    <div key={i} value={filteredStates[i] || `${state}`}  
      onClick={(e) => setState(filteredStates[i])/
      setShowStates(false)}
    >
    {showStates && state}
    </div>
  ));

  const registerUser = async () => {
    if(Password !== Verify){ Swal.fire({title:'Passwords do not match'}) }
    if(State && Email && Password && UserName && Email.includes('@') && Verify === Password){
      const res = await axios.post('/auth/register', { State, UserName, Email, Password })
      if(!res.data){ Swal.fire({title: 'Login Failed', showConfirmButton: false, timer: 3000})}
      Swal.fire({type: 'success', title: 'you are logged in', showConfirmButton: false, timer: 3000})
      dispatch({type: 'LOGIN', payload: true})
      dispatch({type: 'UPDATE_USER', payload: res.data.userData})
      props.setShowRegister(false)
    }
    
  };

  return(
  <div onSubmit={registerUser}>
      <div >
        State<input value={State} onClick={() => setShowStates(true)} onChange={ e => setState(e.target.value)} required/>
        {(State || showStates) && <Button variant='light' onClick={() => setState('')/setShowStates(false)}>x</Button>}
      </div>
      {showStates && <div className='states-list'>{stateList}</div>}
      <br/> 
      <div>
        username and email
        <input type='username' value={UserName} onChange={ e => setUserName(e.target.value)} required/>
        <input type='email' value={Email} onChange={ e => setEmail(e.target.value)} required/>
        {(UserName && Email) && <Button variant='light' onClick={() => setUserName('')/ setEmail('')}>x</Button>}
      </div>
      <br/>
      <div>
        password and verify
        <input value={Password} type={showPassword? 'text':'password'} onChange={ e => setPassword(e.target.value)}/>
        <input value={Verify} type={showPassword? 'text':'password'} onChange={ e => setVerify(e.target.value)}/>
        {(Password && Verify) && <Button variant='light' onClick={() => setPassword('')/ setVerify('')}>x</Button>}
      </div>
      <div style={{display: 'flex', alignItems: 'space-between'}}>
        <Button variant='dark' onClick={registerUser}>register</Button>
        <Button variant='light' onClick={() => setShowPassword(!showPassword)}>show passwords</Button>
      </div>
    </div>
  )
};

export default Register;