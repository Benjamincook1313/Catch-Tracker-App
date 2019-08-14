import React, {useEffect, useState} from 'react';
import './App.css';
import Login from './Components/Login'
import axios from 'axios';
import UserCatches from './Components/UserCatches/UserCatches';
// import 'bootstrap';

function App(props) {
  const [LoggedIn, setLoggedIn] = useState(false);
  const [First, setFirst] = useState('');
  const [Last, setLast] = useState('');
  const [Email, setEmail] = useState('');
  const [UserId, setUserId] = useState(0)
  

  const [] = useState('');

  useEffect(() => {
    const res = axios.get('/api/checkForUser').then(res => {
      if(res.data){
        setLoggedIn(true)
      }
      setFirst(res.data.firstname)
      setLast(res.data.lastname)
      setEmail(res.data.email)
      setUserId(res.data.userid)
    })
    console.log(`${First}`)
  }, []);

  let toggleLogin = () => {
    setLoggedIn(!LoggedIn)
  };
  return (
    <div className="App">
      <p>Hello, Welcome to <h1>Fish-Log</h1> {`${First} ${Last}`}</p>
      <Login toggleLogin={() => toggleLogin()} LoggedIn={LoggedIn}/>
      {LoggedIn &&
        <UserCatches/>
      }
    </div>
  );
}

export default App;
