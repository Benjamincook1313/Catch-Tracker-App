import React, {useEffect, useState} from 'react';
import './App.css';
import Login from './Components/Login'
import axios from 'axios';
import Catch from './Components/Forms/Catch/Catch'
import UserCatches from './Components/UserFish/UserFish';
import styled, { css } from 'styled-components'


function App(props) {

  const [LoggedIn, setLoggedIn] = useState(false);
  const[userData , setUserData] = useState({});
  const [ShowForm, setShowForm] = useState(false);

  useEffect(() => {
    axios.get('/api/checkForUser').then(res => {
        setLoggedIn(true)
        setUserData(res.data)
    })
  }, []);

  let toggleLogin = () => {
    setLoggedIn(!LoggedIn)
  };
  return (
    <div className="App">
      <div>{LoggedIn && `Hello, ${userData.firstname} ${userData.lastname} Welcome to your`}<h1>Catch Tracker</h1> </div>
      <Login toggleLogin={() => toggleLogin()} LoggedIn={LoggedIn}/>
      {LoggedIn &&
        <div className='user-data'>
          {!ShowForm && <button onClick={() => setShowForm(true)}>^-^ Fish On!!! ^-^</button>}
          {ShowForm && <button onClick={() => setShowForm(false)}>Fish Off! :</button>}
          {ShowForm && <Catch />}
          <UserCatches/>
        </div>
      }
    </div>
  );
}

export default App;
