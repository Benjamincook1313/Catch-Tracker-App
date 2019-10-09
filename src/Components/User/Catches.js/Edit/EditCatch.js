import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import DateTime from './DateTime'
import Location from './Location';
import Weather from './Weather'
import Fish from './Fish';
import Fly from './Fly'
import { Button, FormControl } from 'react-bootstrap';
import './EditCatch.css';

function Edit(props){
  const {Image} = props
  const { comments } = props.userCatch
  const dispatch = useDispatch()

  const [Details, setDetails] = useState(comments)
  const [section, setSection] = useState('fly') 

  return(
    <div className='Edit'>
      <button className='x-btn' onClick={() => dispatch({type: 'CLEAR_CATCH'})/props.setEdit()}>X</button>
      <h5 className='section' onClick={() => setSection('date/time')}>Date/Time</h5>
      {(section === 'date/time') &&
        <DateTime />
      }
      <h5 className='section' onClick={() => (section === 'location')? setSection(''): setSection('location')}>Location</h5>
        {(section === 'location') && 
          <Location /> 
        }
      <h5 className='section' onClick={() => (section === 'weather')? setSection(''): setSection('weather')}>Weather</h5>
      {(section === 'weather') && 
        <Weather />
      }
      <h5 className='section' onClick={() => (section === 'fish')? setSection(''): setSection('fish')}>Fish</h5>
        {(section === 'fish') && 
          <Fish Image={Image} />
        }
      <h5 className='section' onClick={() => (section === 'fly')? setSection(''): setSection('fly')}>Fly</h5>
      {(section === 'fly') && 
        <Fly />
      }
      <h5 className='section' onClick={() => (section === 'details')? setSection(''): setSection('details')}>Details</h5>
      {(section === 'details') && 
        <div className='section-info'>
          <FormControl as='textarea' rows='4' max-cols='50' value={Details} onChange={e => setDetails(e.target.value)}/> 
        </div>
      }
      <br/>
      <Button variant='dark' size='sm'>save</Button>
    </div>
  )
};

export default Edit;