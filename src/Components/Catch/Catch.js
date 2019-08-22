import React from 'react';
import Location from './Location';
import Wheather from './Wheather';
import Fish from './Fish/Fish';
import Fly from './Fly'
import ReviewCatch from './ReviewCatch';
import { useSelector, useDispatch } from 'react-redux';

function Catch(){
  const page = useSelector(state => state.page);
  const dispatch = useDispatch();

  const Form = [
    <Location />, 
    <Wheather />, 
    <Fish />, 
    <Fly />,
    <ReviewCatch />
  ];

  return(
    <div className='Catch'>
      <section>
        {Form[page]}
      </section>
      <br/>  
      <div>    
        <button onClick={() => dispatch({type: 'BACK'})}>Back</button>
        <button onClick={() => dispatch({type: 'NEXT'})}>Next</button>
      </div>
    </div>
  )
};

export default Catch;