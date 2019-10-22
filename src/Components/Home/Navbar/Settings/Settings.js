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
  const TempPass = useSelector(state => state.tempPass)
  
  const [homeSt, setHomeSt] = useState(`${User.state}`)
  const [userName, setUserName] = useState(`${User.user_name}`)
  const [newEmail, setNewEmail] = useState(`${User.email}`)
  const [changePass, setChangePass] = useState(false)
  const [pass, setPass] = useState('')
  const [verify, setVerify] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [dltAcc, setDltAcc] = useState(false)

  const States = [
    "Alaska", "Alabama", "Arkansas", "Arizona", "California", "Colorado", "Connecticut", "Delaware", "Florida","Georgia",
    "Hawaii", "Iowa", "Idaho", "Illinois", "Indiana", "Kansas","Kentucky","Louisiana","Massachusetts","Maryland","Maine", 
    "Michigan", "Minnesota","Missouri", "Mississippi","Montana","North Carolina"," North Dakota","Nebraska","New Hampshire",
    "New Jersey", "New Mexico", "Nevada", "New York", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", 
    "South Dakota", "Tennessee", "Texas", "Utah", "Virginia", "Vermont", "Washington", "Wisconsin", "West Virginia", "Wyoming"
  ];
  const stateList = States.map((state, i) => (
    <Dropdown.Item className='list-item' key={i} value={state}  
      onClick={e => setHomeSt(state)}>
      {state}
    </Dropdown.Item>
  ));

  const handleCurrentPass=async(e)=>{
    if(e.key === 'Enter'){
      if(TempPass){
        if(TempPass === pass){
          return setChangePass(true)
        }
      }
      const res = await axios.post('/auth/checkPass', {userName: User.user_name, pass})
      if(!res.data){
        Swal.fire({
          type: 'warning', 
          title: 'incorrect password', 
          showConfirmButton: false, timer: 2000
        })
      }else{
        setPass('')
        setChangePass(true)
      }
    }
  };

  const updateUser=async()=>{
    const res = await axios.put(`/auth/updateUser/${User.user_id}`, {homeSt, userName, newEmail})
    if(res.data){
      Swal.fire({
        type: 'success', 
        title: 'Info Updated', 
        showConfirmButton: false, timer: 2000
      })
      await dispatch({type: 'UPDATE_USER', payload: res.data})
      refresh()
    }
  };

  const updatePass = async(e)=>{
    if(e.key === 'Enter'){
      if(pass !== verify){
        Swal.fire({
          type: 'warning', 
          title: 'Passwords do not match!', 
          timer: 2000, showConfirmButton: false
        })
      }
      if(pass === verify && verify !== ''){
        const res = await axios.put(`/auth/updatePass/${User.user_id}`, {pass})
        if(res.data){
          Swal.fire({
            type: 'success', 
            title: `${res.data.message}`, 
            timer: 2000, showConfirmButton: false
          })
          setChangePass(false)
          setPass('')
          setVerify('')
        }
      }
    }
  };

  const deleteAccount = async()=>{
    const res = await axios.delete(`/auth/deleteAccount/${User.user_id}`)
    if(res.data.message){
      dispatch({type: 'RESET'})
      setSettings()
      refresh()
      Swal.fire({
        type: 'success', 
        title: `${res.data.message}`, 
        timer: 2000, showConfirmButton: false
      })
    }
  };

  return(
    <div className='Settings'>
      <div className='s-top'>
        <h4>{User.user_name}</h4>
        <div className='s-x-btn' onClick={setSettings}>X</div>
      </div>
      <h2 className='setting'>User Settings</h2>
      {dltAcc &&
        <div className='delete-account'>
          <h2>Are you sure you want to delete your account?</h2>
          <h3>All of your catches and their info will be gone and you will not be able to get them back!</h3>
          <div className='dlt-btns'>
            <Button variant='dark' size='lg' onClick={() => setDltAcc(false)}>No</Button>
            <Button variant='dark' size='lg' onClick={deleteAccount}>Yes</Button>
          </div>
        </div>
      }
      <div className='s-inputs'>
        <InputGroup className='mb-3'>
          <InputGroup.Prepend>
            <InputGroup.Text>Home State</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl value={homeSt} style={{background: 'white'}} readOnly/>
          <DropdownButton as={InputGroup.Append} variant='outline-secondary' title='' alignRight>
            <Scroll className='list'>{stateList}</Scroll>
          </DropdownButton>
        </InputGroup>
        <InputGroup className='mb-3'>
          <InputGroup.Prepend id='basic-addon1'>
            <InputGroup.Text>Username</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl value={userName} onChange={e => setUserName(e.target.value)} />
        </InputGroup>
        <InputGroup className='mb-3'>
          <InputGroup.Prepend>
            <InputGroup.Text>Email</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl type='email' value={newEmail} onChange={e => setNewEmail(e.target.value)}/>
        </InputGroup>
        {(homeSt !== User.state || (userName !== User.user_name && userName !== '') || (newEmail !== User.email && newEmail !== '')) &&
          <Button className='mb-3' variant='dark' type='submit' onClick={updateUser}>Update Info</Button>
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
              onChange={e => setVerify(e.target.value)}
              onKeyPress={e => updatePass(e)}
            />
            <InputGroup.Append id='basic-addon2' >
              <InputGroup.Text>
                <FontAwesomeIcon icon={!showPass? faEye: faEyeSlash} onClick={() => setShowPass(!showPass)}/>
              </InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
        }
        {!changePass? 
          <div>(press enter to submit current password)</div>:
          <div className='s-btns'>
            <div>(press enter to update password)</div>
            <Button className='dlt-btn' variant='light' onClick={() => setDltAcc(true)} >Delete Account</Button>
          </div>
        }
      </div>
      <br/>
      <br/>
    </div>
  )
};

export default Settings;