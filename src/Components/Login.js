import React, { useState } from 'react';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';

function Login(){
  const loggedIn = useSelector(state => state.loggedIn)
  const dispatch = useDispatch();

  const [FirstName, setFirstName] = useState('')
  const [LastName, setLastName] = useState('')
  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const [Verify, setVerify] = useState('')
  const [Login, setLogin] = useState(false)
  const [Register, setRegister] = useState(false)
  
  const register = async (e) => {
    if(e.key === 'Enter' && Email !== '' && Password !== '' && Email.includes('@') && Verify === Password){
      if(Password !== Verify){ alert('Passwords do not match') }
      const res = await axios.post('/auth/register', { FirstName, LastName, Email, Password })
      if(!res.data.loggedIn){ alert('Login Failed') }
      alert('you are logged in')
      // props.setLoggedIn(true)
      dispatch({type: 'LOGIN'})
      dispatch({type: 'UPDATE_USER', payload: res.data.userData})
      // props.setUser(res.data)
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
        // props.setUser(res.data)
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
      // props.setLoggedIn(false)
      dispatch({type: 'UPDATE_USER', payload: {}})
      // props.setUser({})
      alert('logged out')
    }
  }

  return(
    <div className='Login'>
      {!loggedIn && 
        <div>
          <button onClick={() => {if(setRegister){setRegister(false) && setLogin(true)} setLogin(!Login)}}>login</button>
          <button onClick={() => {if(Login){setLogin(false) && setRegister(true)} setRegister(!Register)}}>register</button>
        </div> 
      }
      {loggedIn &&
        <button onClick={logout}>logout</button>
      }
      {Register &&
        <div>
          <div className='register-name'>
            First name <input value={FirstName} onChange={ e => setFirstName(e.target.value)}/>
            Last name <input value={LastName} onChange={ e => setLastName(e.target.value)}/>
          </div>
          <div>
            Email <input value={Email} onChange={ e => setEmail(e.target.value)}/>
            Password <input type='password' value={Password} onChange={ e => setPassword(e.target.value)}/>
            Verify Password<input type='password' value={Verify} onChange={ e => setVerify(e.target.value)} onKeyPress={e => register(e)}/>
            <button onClick={() => setRegister(false)}>x</button>
          </div>
          {/* <button onClick={() => register()}>Register</button> */}
        </div>
      }
      {Login &&
        <div>
          Email <input value={Email} type='email' onChange={e => setEmail(e.target.value)}/>
          Password <input value={Password} type='password' onChange={e => setPassword(e.target.value)} onKeyPress={e => login(e)}/>
          {/* <button onClick={login}>Login</button> */}
          <button onClick={() => setLogin(false)}>x</button>
        </div>
      }
    </div>
  )
};

// const mapStateToProps=(reduxState)=>{
//   return {
//     userData: reduxState.userData,
//     loggedIn: reduxState.loggedIn 
//   }
// }

// export default connect(mapStateToProps, {})(Login);
export default Login;