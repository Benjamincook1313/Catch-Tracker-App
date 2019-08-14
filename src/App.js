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
          {!ShowForm && <button onClick={() => setShowForm(true)}>^-^ Fish On ^-^</button>}
          {ShowForm && <button onClick={() => setShowForm(false)}>Fish Off :(</button>}
          {ShowForm && <Form />}
          <UserCatches/>
        </div>
      }
      <div>
        Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a>, <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>
      </div>
    </div>
  );
}

export default App;
