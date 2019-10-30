import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
import { InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import Scroll from 'react-scrollbar';
import Swal from 'sweetalert2';
import axios from 'axios';

function Register(props){
  const { setShowRegister } = props
  // const dispatch = useDispatch()

  const [userName, setUserName] = useState('')
  const [state, setState] = useState('')
  const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  // const [verify, setVerify] = useState('')
  // const [showPass, setShowPass] = useState(false)

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
      if(state && email && userName && email.includes('@')){
        const res = await axios.post('/auth/register', { state, userName: userName.toLowerCase(), email })
        if(res.data.message){
          Swal.fire({
            type: 'warning', 
            title: `${res.data.message}`, 
            showConfirmButton: false, timer: 2000,
            toast: true, position: 'top'
          })
        }else{
          Swal.fire({
            type: 'success', 
            title: `your temparary password was sent to ${email}`, 
            showConfirmButton: false, timer: 2000 
          })
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
            value={state} 
            onChange={e => setState(e.target.value)} 
            readOnly
          />
          <DropdownButton as={InputGroup.Append} variant='outline-secondary' title='' alignRight>
            <Scroll className='list'>{stateList}</Scroll>
          </DropdownButton>
        </InputGroup>
        <br/> 
        <InputGroup className='mb-3 name-email'>
          <FormControl 
            placeholder='Username' 
            type='Username' 
            value={userName} 
            onChange={e => setUserName(e.target.value)} 
            required
          />
          <FormControl 
            placeholder='Email' 
            type='email' 
            value={email} 
            onChange={ e => setEmail(e.target.value)} 
            onKeyPress={e => registerUser(e)}
            required
          />
        </InputGroup>
        {email && <div>( press enter to register )</div>}
      </div>
    </div>
  )
};

export default Register;