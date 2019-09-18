import React from 'react';
import './Fly-Rod.css';

function flyRod(){
  return(
    <div className='flyRod'>
      <div className='cork'></div>
      <div className='rod'>
        <div className='eye1'></div>
        <div className='eye2'></div>
        <div className='eye3'></div>
        <div className='eye4'></div>
        <div className='eye5'></div>
      </div>
      <div className='reel'>
      <div className='foot'></div>
      <div className='knob'></div>
      </div>
    </div>
  )
};

export default flyRod;