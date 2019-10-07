import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import DateTime from './DateTime'
import Location from './Location';
import Weather from './Weather'
import Fish from './Fish';
import Fly from './Fly'
import { Button } from 'react-bootstrap';
import './EditCatch.css';

function Edit(props){
  const { comments } = props.userCatch
  const dispatch = useDispatch()
  const [section, setSection] = useState('') 

  return(
    <div className='Edit'>
      <button className='x-btn' onClick={() => dispatch({type: 'CLEAR_CATCH'})/props.setEdit()}>X</button>
      <h5 className='section' onClick={() => setSection('date/time')}>Date/Time</h5>
      {(section === 'date/time') &&
        <DateTime />
      }
      <h5 className='section' onClick={() => setSection('location')}>Location</h5>
        {(section === 'location') && 
          <Location /> 
        }
      <h5 className='section' onClick={() => setSection('weather')}>Weather</h5>
      {(section === 'weather') && 
        <Weather />
      }
      <h5 className='section' onClick={() => setSection('fish')}>Fish</h5>
        {(section === 'fish') && 
          <Fish />
        }
      <h5 className='section' onClick={() => setSection('fly')}>Fly</h5>
      {(section === 'fly') && 
        <Fly />
      }
      <h5 className='section' onClick={() => setSection('comment')}>Details</h5>
      {(section === 'details') && 
        <div className='section-info'>
          comments: <input/> 
        </div>
      }
      <br/>
      <Button variant='dark' size='sm'>save</Button>
    </div>
  )
};

export default Edit;