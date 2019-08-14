import React, { useState } from 'react';
import axios from 'axios'

function Login(props){
  const { LoggedIn } = props

  const [FirstName, setFirstName] = useState('')
  const [LastName, setLastName] = useState('')
  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const [Verify, setVerify] = useState('')
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  
  async function register(){
    if(Email !== '' && Password !== '' && Email.includes('@') && Verify === Password){
      if(Password !== Verify){alert('Passwords do not match')}
      const res = await axios.post('/auth/register', { FirstName, LastName, Email, Password })
      if(!res.data){ alert('Login Failed') }
      alert('you are logged in')
      setFirstName('')
      setLastName('')
      setEmail('')
      setPassword('')
      setVerify('')
      setShowRegister(false)
    }
  }
  
  async function login(){
    if(Email !== ''){
      const res = await axios.post('/auth/login', {Email, Password})
      console.log(res.firstname)
      if(res.data){
        setEmail('')
        setPassword('')
        props.toggleLogin()
        setShowLogin(false)
      }
    }
  }

  const logout = async () => {
    const res = await axios.get('/auth/logout')
    console.log(res.data)
    if(!res.data.loggedIn){
      props.toggleLogin()
    }
  }

  return(
    <div className='Login'>
      {!LoggedIn && 
        <div>
          <button onClick={() => {if(setShowRegister){setShowRegister(false) && setShowLogin(true)} setShowLogin(!showLogin)}}>login</button>
          <button onClick={() => {if(showLogin){setShowLogin(false) && setShowRegister(true)} setShowRegister(!showRegister)}}>register</button>
        </div> 
      }
      {LoggedIn &&
        <button onClick={() => logout()}>logout</button>
      }
      {showRegister &&
        <div>
          <div className='register-name'>
            First name <input value={FirstName} onChange={ e => setFirstName(e.target.value)}/>
            Last name <input value={LastName} onChange={ e => setLastName(e.target.value)}/>
          </div>
          <div>
            Email <input value={Email} onChange={ e => setEmail(e.target.value)}/>
            Password <input type='password' value={Password} onChange={ e => setPassword(e.target.value)}/>
            Verify Password<input type='password' value={Verify} onChange={ e => setVerify(e.target.value)}/>
          </div>
          <button onClick={() => register()}>Register</button>
          <button onClick={() => setShowRegister(false)}>x</button>
        </div>
      }
      {showLogin &&
        <div>
          Email <input value={Email} type='email' onChange={e => setEmail(e.target.value)}/>
          Password <input value={Password} type='password'onChange={e => setPassword(e.target.value)}/>
          <button onClick={() => login()}>Login</button>
          <button onClick={() => setShowLogin(false)}>x</button>
        </div>
      }
    </div>
  )
}

export default Login;