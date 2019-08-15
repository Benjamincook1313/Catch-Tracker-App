import React, {useEffect, useState} from 'react';
import './App.css';
import Login from './Components/Login'
import axios from 'axios';
import Form from './Components/Forms/Form'
import UserCatches from './Components/UserFish/UserFish';


function App(props) {

  const [LoggedIn, setLoggedIn] = useState(false);
  const [First, setFirst] = useState('');
  const [Last, setLast] = useState('');
  // const [Email, setEmail] = useState('');
  // const [UserId, setUserId] = useState(0);
  const [ShowForm, setShowForm] = useState(false);

  useEffect(() => {
    const res = axios.get('/api/checkForUser').then(res => {
      if(res.data){
        setLoggedIn(true)
      }
      setFirst(res.data.firstname)
      setLast(res.data.lastname)
      // setEmail(res.data.email)
      // setUserId(res.data.userid)
    })
  }, []);

  let toggleLogin = () => {
    setLoggedIn(!LoggedIn)
  };
  return (
    <div className="App">
      <div>{LoggedIn && `Hello, ${First} ${Last} Welcome to your`}<h1>Fish-Log</h1> </div>
      <Login toggleLogin={() => toggleLogin()} LoggedIn={LoggedIn}/>
      {LoggedIn &&
        <div className='user-data'>
          {!ShowForm && <button onClick={() => setShowForm(true)}>^-^ Fish On!!! ^-^</button>}
          {ShowForm && <button onClick={() => setShowForm(false)}>Fish Off! :(</button>}
          {ShowForm && <Form />}
          <UserCatches/>
        </div>
      }
    </div>
  );
}

export default App;
