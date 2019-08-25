import React from 'react';
import { useSelector } from 'react-redux';
import Location from './Location';
import Weather from './Weather';
import Fish from './Fish/Fish';
import Fly from './Fly'
import ReviewCatch from './ReviewCatch';

function Catch(){
  const page = useSelector(state => state.page);

  const Form = [
    <Location />, 
    <Weather />, 
    <Fish />, 
    <Fly />,
    <ReviewCatch />
  ];

  return(
    <div className='Catch'>
      {Form[page]}
    </div>
  )
};

export default Catch;