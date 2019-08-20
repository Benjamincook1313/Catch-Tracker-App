import React, {useEffect, useState} from 'react';
import './App.css';
import Login from './Components/Login/Login'
import Catch from './Components/Catch/Catch'
import UserCatches from './Components/UserFish/UserFish';
// import styled, { css } from 'styled-components'
import axios from 'axios';


function App(props) {

  const [LoggedIn, setLoggedIn] = useState(false);
  const[userData , setUserData] = useState({});
  const [ShowForm, setShowForm] = useState(false);

  useEffect(() => {
    axios.get('/api/checkForUser').then(res => {
      if(res.data){
        setLoggedIn(true)
        setUserData(res.data)
      }
    })
  }, []);

  let toggleLogin = () => {
    setLoggedIn(!LoggedIn)
  };
  return (
    <div className="App">
      <div>
        {LoggedIn && `Hello, ${userData.firstname} ${userData.lastname} Welcome to your`}
        <h1>Catch Tracker</h1> 
      </div>
      <div>
        <Login toggleLogin={() => toggleLogin()} LoggedIn={LoggedIn} setLoggedIn={() => setLoggedIn()}/>
      </div>
      <br/>
      {LoggedIn &&
        <div className='user-data'>
          {!ShowForm && <button onClick={() => setShowForm(true)}>^-^ Fish On!!! ^-^</button>}
          {ShowForm && <button onClick={() => setShowForm(false)}>Fish Off!</button>}
          {ShowForm && <Catch/>}
          <UserCatches/>
        </div>
      }
    </div>
  );
}

export default App;
