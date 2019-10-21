import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import Scroll from 'react-scrollbar';
import Swal from 'sweetalert2';
import axios from 'axios';

function Register(props){
  const { setShowRegister } = props
  const dispatch = useDispatch()

  const [UserName, setUserName] = useState('')
  const [State, setState] = useState('')
  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const [Verify, setVerify] = useState('')
  const [showPass, setShowPass] = useState(false)

  const States = [
    "Alaska", "Alabama", "Arkansas", "Arizona", "California", "Colorado", "Connecticut", "Delaware", "Florida","Georgia",
    "Hawaii", "Iowa", "Idaho", "Illinois", "Indiana", "Kansas","Kentucky","Louisiana","Massachusetts","Maryland","Maine", 
    "Michigan", "Minnesota","Missouri", "Mississippi","Montana","North Carolina"," North Dakota","Nebraska","New Hampshire",
    "New Jersey", "New Mexico", "Nevada", "New York", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", 
    "South Dakota", "Tennessee", "Texas", "Utah", "Virginia", "Vermont", "Washington", "Wisconsin", "West Virginia", "Wyoming"
  ];

  const stateList = States.map((state, i) => (
    <Dropdown.Item className='list-item' key={i} value={state} onClick={(e) => setState(state)}>
      {state}
    </Dropdown.Item>
  ));

  const registerUser = async (e) => {
    if(e.key === 'Enter'){
      if(Password !== Verify){ Swal.fire({type: 'error', title: 'try again', text: 'Passwords do not match', timer: 2000, showConfirmButton: false}) }
      if(State && Email && Password && UserName && Email.includes('@') && Verify === Password){
        const res = await axios.post('/auth/register', { State, UserName, Email, Password })
        if(!res.data.loggedIn){
          Swal.fire({type: 'warning', title: `${res.data.message}`, text: 'try again', showConfirmButton: false, timer: 2000})
        }else{
          Swal.fire({type: 'success', title: 'you are logged in', showConfirmButton: false, timer: 2000, toast: true, position: 'top-end'})
          dispatch({type: 'LOGIN', payload: true})
          dispatch({type: 'UPDATE_USER', payload: res.data.userData})
          setShowRegister()
        }
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
            style={{background: 'white'}}
            placeholder='Home State' 
            value={State} 
            onChange={e => setState(e.target.value)} 
            readOnly
          />
          <DropdownButton as={InputGroup.Append} variant='outline-secondary' title='' alignRight>
            <Scroll className='list'>{stateList}</Scroll>
          </DropdownButton>
        </InputGroup>
        <br/> 
        <InputGroup>
          <FormControl 
            placeholder='Username' 
            type='Username' 
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
            placeholder='Password' 
            value={Password} 
            type={showPass? 'text':'password'} 
            onChange={e => setPassword(e.target.value)}
          />
          <FormControl 
            placeholder='Verify' 
            value={Verify} 
            type={showPass? 'text':'password'} 
            onChange={e => setVerify(e.target.value)} 
            onKeyPress={e => registerUser(e)}
          />
          <InputGroup.Append id='basic-addon2' >
              <InputGroup.Text>
                <FontAwesomeIcon icon={!showPass? faEye: faEyeSlash} onClick={() => setShowPass(!showPass)}/>
              </InputGroup.Text>
            </InputGroup.Append>
        </InputGroup>
        <br/>
        <div>( press enter to submit )</div>
      </div>
    </div>
  )
};

export default Register;