import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';

function Login(){
  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.loggedIn)

  const [FirstName, setFirstName] = useState('')
  const [LastName, setLastName] = useState('')
  const [UserName, setUserName] = useState('')
  const [State, setState] = useState('')
  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const [Verify, setVerify] = useState('')

  const [Login, setLogin] = useState(false)
  const [Register, setRegister] = useState(true)
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
  
  const register = async (e) => {
    if(e.key === 'Enter' && State && Email && Password && UserName && Email.includes('@') && Verify === Password){
      if(Password !== Verify){ alert('Passwords do not match') }
      const res = await axios.post('/auth/register', { State, FirstName, LastName, UserName, Email, Password })
      if(!res.data.loggedIn){ alert('Login Failed') }
      alert('you are logged in')
      dispatch({type: 'LOGIN'})
      dispatch({type: 'UPDATE_USER', payload: res.data.userData})
      setFirstName('')
      setLastName('')
      setEmail('')
      setPassword('')
      setVerify('')
      setLogin(false)
      setRegister(false)
    }
  };
  
  const login = async (e) => {
    if(Email !== '' && e.key === 'Enter'){
      const res = await axios.post('/auth/login', {Email, Password})
      if(res.data.loggedIn){
        dispatch({type: 'LOGIN'})
        dispatch({type: 'UPDATE_USER', payload: res.data.userData})
        setFirstName('')
        setLastName('')
        setEmail('')
        setPassword('')
        setVerify('')
        setLogin(false)
        setRegister(false)
      }
    }
  };

  const logout = async () => {
    let res = await axios.get('/auth/logout')
    if(!res.data.loggedIn){
      dispatch({type: 'LOGOUT'})
      dispatch({type: 'UPDATE_USER', payload: {}})
      alert('logged out')
    }
  }

  return(
    <div className='Login' style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100vw'}}>
      {!loggedIn && 
        <div>
          <button className='btn btn-dark' onClick={() => {if(setRegister){setRegister(false) && setLogin(true)} setLogin(!Login)}}>login</button>
          <button className='btn btn-dark' onClick={() => {if(Login){setLogin(false) && setRegister(true)} setRegister(!Register)}}>register</button>
        </div> 
      }
      {loggedIn &&
        <button className='btn btn-dark' onClick={logout}>logout</button>
      }
      <br/>
      {Register &&
        <form className="shadow p-3 mb-5 bg-white rounded" 
          onSubmit={register}
          style={{
            position: 'relative',
            padding: '50px',
            border: '2px solid black', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            width: '60%'
            }}
          >
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">State</span>
            </div>
            <input type="text" className="form-control" value={State} 
              onClick={() => setShowStates(true)}
              onChange={ e => setState(e.target.value)}
            />
            {(State || showStates) && <button className='btn btn-light' onClick={() => setState('')/setShowStates(false)}>x</button>}
          </div>
          {showStates && <div className='list' style={{width: 150, position: 'relative', left: 189, zIndex: '2'}}>{stateList}</div>}
          <br/> 
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">First and Last name</span>
            </div>
            <input type="text" aria-label="First name" className="form-control" value={FirstName} 
              onChange={ e => setFirstName(e.target.value)}
            />
            <input type="text" aria-label="Last name" className="form-control" value={LastName} 
              onChange={ e => setLastName(e.target.value)}
            />
            {(FirstName && LastName) && <button className='btn btn-light' onClick={() => setUserName('')/ setEmail('')}>x</button>}
          </div>
          <br/>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">username and email</span>
            </div>
            <input type="text" aria-label="username" className="form-control" value={UserName} 
              onChange={ e => setUserName(e.target.value)}
            />
            <input type="text" aria-label="Email" className="form-control" value={Email} 
              onChange={ e => setEmail(e.target.value)}
            />
            {(UserName && Email) && <button className='btn btn-light' onClick={() => setUserName('')/ setEmail('')}>x</button>}
          </div>
          <br/>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">password and verify</span>
            </div>
            <input  aria-label="password" className="form-control" value={Password} 
              type={showPassword? 'text':'password'}
              onChange={ e => setPassword(e.target.value)}
            />
            <input aria-label="password" className="form-control" value={Verify} 
              type={showPassword? 'text':'password'}
              onChange={ e => setVerify(e.target.value)}
            />
            {(Password && Verify) && <button className='btn btn-light' onClick={() => setPassword('')/ setVerify('')}>x</button>}
          </div>
          <div style={{display: 'flex', alignItems: 'space-between'}}>
            <input className='btn btn-dark' type='submit' value='submit'/>
            <button className='btn btn-light'  onClick={() => setShowPassword(!showPassword)}>show passwords</button>
          </div>
        </form>
      }
      {Login &&
        <div>
          Email <input value={Email} type='email' onChange={e => setEmail(e.target.value)}/>
          Password <input value={Password} type='password' onChange={e => setPassword(e.target.value)} onKeyPress={e => login(e)}/>
          <button className='btn btn-dark' onClick={() => setLogin(false)}>x</button>
        </div>
      }
    </div>
  )
};

export default Login;