import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import EditLocation from './Location';
import EditWeather from './Weather'
import EditFish from './Fish';
import EditFly from './Fly'
import { Button } from 'react-bootstrap';
import './EditCatch.css';

function Edit(props){
  const { comments } = props.userCatch
  const dispatch = useDispatch()
  const [section, setSection] = useState('') 

  return(
    <div className='Edit'>
      <p className='section' onClick={() => setSection('location')}>Location</p>
        {(section === 'location') && 
          <EditLocation /> 
        }
      <p className='section' onClick={() => setSection('weather')}>Weather</p>
      {(section === 'weather') && 
        <EditWeather />
      }
      <p className='section' onClick={() => setSection('fish')}>Fish</p>
        {(section === 'fish') && 
          <EditFish />
        }
      <p className='section' onClick={() => setSection('fly')}>Fly</p>
      {(section === 'fly') && 
        <EditFly />
      }
      <p className='section' onClick={() => setSection('comment')}>Details</p>
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