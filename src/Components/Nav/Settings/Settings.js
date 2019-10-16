import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InputGroup, FormControl, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import axios from 'axios';
import Scroll from 'react-scrollbar';
import './Settings.css';

function Settings(props){   
  const { setSettings } = props
  const dispatch = useDispatch()
  const User = useSelector(state => state.user)
  const State = useSelector(state => state.usState)

  const [name, setName] = useState('')
  const [changePass, setChangePass] = useState(false)
  const [tempPass, setTempPass] = useState('')
  const [pass, setPass] = useState('')
  const [newPass, setNewPass] = useState('')
  const [verify, setVerify] = useState(' ')

  const States = [
    "Alaska", "Alabama", "Arkansas", "Arizona", "California", "Colorado", "Connecticut", "Delaware", "Florida","Georgia",
    "Hawaii", "Iowa", "Idaho", "Illinois", "Indiana", "Kansas","Kentucky","Louisiana","Massachusetts","Maryland","Maine", 
    "Michigan", "Minnesota","Missouri", "Mississippi","Montana","North Carolina"," North Dakota","Nebraska","New Hampshire",
    "New Jersey", "New Mexico", "Nevada", "New York", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", 
    "South Dakota", "Tennessee", "Texas", "Utah", "Virginia", "Vermont", "Washington", "Wisconsin", "West Virginia", "Wyoming"
  ];
  const stateList = States.map((state, i) => (
    <Dropdown.Item className='list-item' key={i} value={state}  
      onClick={e => dispatch({type: 'US_STATE', payload: state})}>
      {state}
    </Dropdown.Item>
  ));

  const handleCurrentPass=async(e)=>{
    if(e.key === 'Enter'){
      if(tempPass){
        if(tempPass === pass){
          setChangePass(true)
        }
      }
      let res = await axios.post('/auth/checkPass', {User, pass})
      if(res.data){
        setChangePass(res.data)
      }
    }
  } ;

  return(
    <div className='Settings' >
      <div className='s-top'>
        <h4>{User.user_name}</h4>
        <div className='s-x-btn' onClick={() => dispatch({type: 'US_STATE'})/setSettings}>X</div>
      </div>
      <h2 className='setting'>Settings</h2>
      <div className='s-inputs'>
        <InputGroup className='mb-3'>
          <InputGroup.Prepend>
            <InputGroup.Text>Home State</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl value={State} style={{background: 'white'}} readOnly/>
          <DropdownButton as={InputGroup.Append} variant='outline-secondary' title='' alignRight>
            <Scroll className='list'>{stateList}</Scroll>
          </DropdownButton>
        </InputGroup>
        <br/>
        <InputGroup className='mb-3'>
          <InputGroup.Prepend id='basic-addon1'>
            <InputGroup.Text>username</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl placeholder={`${User.user_name}`} value={name} onChange={e => setName(e.target.value)} />
        </InputGroup>
        <InputGroup className='mb-3'>
          <InputGroup.Prepend>
            <InputGroup.Text>email</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl placeholder={`${User.email}`} />
        </InputGroup>
        <br/>
        <InputGroup className='mb-3'>
          <InputGroup.Prepend id='basic-addon1' onClick={() => setChangePass(!changePass)}>
            <InputGroup.Text>password</InputGroup.Text>
          </InputGroup.Prepend>
            {!changePass?
              <FormControl placeholder='current password' onKeyPress={e => handleCurrentPass(e)}/>:
              <div className='change-password' >
                <FormControl placeholder='password'/>
                <FormControl placeholder='verify'/>
              </div>
            }
        </InputGroup>
      </div>
      <br/>
      <br/>
      <Button variant='dark'>Save</Button>
    </div>
  )
};

export default Settings;