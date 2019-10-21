import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InputGroup, FormControl, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import axios from 'axios';
import Scroll from 'react-scrollbar';
import './Settings.css';

function Settings(props){   
  const { setSettings, refresh } = props
  const dispatch = useDispatch()
  const User = useSelector(state => state.user)
  
  const [state, setState] = useState(`${User.state}`)
  const [name, setName] = useState(`${User.user_name}`)
  const [email, setEmail] = useState(`${User.email}`)
  const [changePass, setChangePass] = useState(false)
  const [tempPass, setTempPass] = useState('')
  const [pass, setPass] = useState('')
  const [verify, setVerify] = useState('')
  const [showPass, setShowPass] = useState(false)

  const States = [
    "Alaska", "Alabama", "Arkansas", "Arizona", "California", "Colorado", "Connecticut", "Delaware", "Florida","Georgia",
    "Hawaii", "Iowa", "Idaho", "Illinois", "Indiana", "Kansas","Kentucky","Louisiana","Massachusetts","Maryland","Maine", 
    "Michigan", "Minnesota","Missouri", "Mississippi","Montana","North Carolina"," North Dakota","Nebraska","New Hampshire",
    "New Jersey", "New Mexico", "Nevada", "New York", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", 
    "South Dakota", "Tennessee", "Texas", "Utah", "Virginia", "Vermont", "Washington", "Wisconsin", "West Virginia", "Wyoming"
  ];
  const stateList = States.map((state, i) => (
    <Dropdown.Item className='list-item' key={i} value={state}  
      onClick={e => setState(state)}>
      {state}
    </Dropdown.Item>
  ));

  const resetInfo=()=>{
    setState('')
    setName('')
    setEmail('')
  };
  const resetPass =()=>{
    setTempPass('')
    setPass('')
    setChangePass(false)
    setVerify('')
    setShowPass(false)
  };

  const handleCurrentPass=async(e)=>{
    if(e.key === 'Enter'){
      if(tempPass){
        if(tempPass === pass){
          setChangePass(true)
        }
      }
      const res = await axios.post('/auth/checkPass', {User, pass})
      if(!res.data){
        Swal.fire({type: 'warning', title: 'incorrect password', showConfirmButton: false, timer: 2000})
      }else{
        setPass('')
        setChangePass(true)
      }
    }
  };

  const updatePass = async()=>{
    if(pass === verify && verify !== ''){
      const res = await axios.put(`/auth/updatePassword:${User.user_id}`, pass)
      if(res.data){
        console.log(res.data)
        Swal.fire({type: 'success', title: 'Info Updated', timer: 2000, showConfirmButton: false})
        dispatch({type: 'UPDATE_USER', payload: res.data})
        refresh()
      }
    }
  }

  const saveUserInfo=async()=>{
    const res = await axios.put(`/auth/updateUser:${User.user_id}`, [state, name, email])
    if(res.data){
      Swal.fire({type: 'success', title: 'Info Updated', showConfirmButton: false, timer: 2000})
      dispatch({type: 'UPDATE_USER', payload: res.data})
    }
  };

  return(
    <div className='Settings' >
      <div className='s-top'>
        <h4>{User.user_name}</h4>
        <div className='s-x-btn' onClick={setSettings}>X</div>
      </div>
      <h2 className='setting'>User Settings</h2>
      <div className='s-inputs'>
        <InputGroup className='mb-3'>
          <InputGroup.Prepend>
            <InputGroup.Text>Home State</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl value={state} style={{background: 'white'}} readOnly/>
          <DropdownButton as={InputGroup.Append} variant='outline-secondary' title='' alignRight>
            <Scroll className='list'>{stateList}</Scroll>
          </DropdownButton>
        </InputGroup>
        <InputGroup className='mb-3'>
          <InputGroup.Prepend id='basic-addon1'>
            <InputGroup.Text>Username</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl value={name} onChange={e => setName(e.target.value)} />
        </InputGroup>
        <InputGroup className='mb-3'>
          <InputGroup.Prepend>
            <InputGroup.Text>Email</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl type='email' value={email} onChange={e => setEmail(e.target.value)}/>
        </InputGroup>
        {(state !== User.state || (name !== User.user_name && name !== '') || (email !== User.email && email !== '')) &&
          <Button className='mb-3' variant='dark' type='submit' onClick={saveUserInfo}>Update Info</Button>
        }
        <br/>
        {!changePass?
          <InputGroup className='mb-3'>
            <InputGroup.Prepend id='basic-addon1' >
              <InputGroup.Text>Password</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl 
              type={showPass? 'text':'password'} 
              value={pass} 
              placeholder='current password' 
              onChange={e => setPass(e.target.value)} onKeyPress={e => handleCurrentPass(e)}
            />
            <InputGroup.Append id='basic-addon2' >
              <InputGroup.Text>
                <FontAwesomeIcon icon={!showPass? faEye: faEyeSlash} onClick={() => setShowPass(!showPass)}/>
              </InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>:
          <InputGroup className='mb-3'>
            <InputGroup.Prepend id='basic-addon1' >
              <InputGroup.Text>Password</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl type={showPass? 'text':'password'} value={pass} placeholder='new password'
              onChange={e => setPass(e.target.value)}/>
            <FormControl type={showPass? 'text':'password'} value={verify} placeholder='verify'
              onChange={e => setVerify(e.target.value)}/>
            <InputGroup.Append id='basic-addon2' >
              <InputGroup.Text>
                <FontAwesomeIcon icon={!showPass? faEye: faEyeSlash} onClick={() => setShowPass(!showPass)}/>
              </InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
        }
        {!changePass? 
          <div>(press enter to submit current password)</div>:
          <Button variant='dark' onClick={updatePass} >Update Password</Button>
        }
      </div>
      <br/>
      <br/>
    </div>
  )
};

export default Settings;