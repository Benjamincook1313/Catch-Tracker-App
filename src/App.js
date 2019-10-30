import React from 'react';
import Home from './Components/Home/Home';
import Store from './Components/Store/Store';
import { HashRouter, Switch, Route } from 'react-router-dom';
import './App.css';

function App(){
  return (
    <HashRouter>
      <Switch>
        <Route path='/' exact component={ Home } />
        <Route path='/store' component={ Store} />
      </Switch>
      {/* <footer></footer> */}
    </HashRouter>
  );
};

export default App;
