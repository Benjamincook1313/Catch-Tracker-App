import React, { useEffect, useState } from 'react';
import Login from './Components/Catch/Login';
import Catch from './Components/Catch/Catch';
import UserCatches from './Components/Catch/UserCatches';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
// import styled, { css } from 'styled-components';
import './App.css';

function App() {;
  const loggedIn = useSelector(state => state.loggedIn)
  // const User = useSelector(state => state.User)
  const dispatch = useDispatch();

  // const [LoggedIn, setLoggedIn] = useState('');
  const [User, setUser] = useState({})
  const [ShowForm, setShowForm] = useState(false);

  useEffect(() => {
    axios.get('/auth/checkForUser').then(res => {
      if(res.data.userData){
        dispatch({type: 'LOGIN'})
        // setLoggedIn(true)
        setUser(res.data.userData)
        setShowForm(true)
      }
    })
  }, []);

  return (
    <div className="App">
      <div>
        {loggedIn && `Hello, ${User? User.firstname: null} ${User? User.lastname: null} Welcome to your`}
        <h1>Catch - Tracker</h1> 
      </div>
      <div>
        <Login 
          // LoggedIn={LoggedIn} 
          // setLoggedIn={() => setLoggedIn()} 
          setUser={() => setUser()} 
        />
      </div>
      <br/>
      {loggedIn &&
        <div className='user-data'>
          {!ShowForm && <button onClick={() => setShowForm(true)}>^-^ Fish On!!! ^-^</button>}
          {ShowForm && <button onClick={() => setShowForm(false)}>Fish Off!</button>}
          {ShowForm && 
            <div>
              <Catch/>
            </div>
          }
          <UserCatches/>
        </div>
      }
    </div>
  );
};

// const mapState=(state)=>{
//   return {
//     userData: state.userData,
//     loggedIn: state.loggedIn
//   }
// }

// export default connect(mapState, {})(App);
export default App;
