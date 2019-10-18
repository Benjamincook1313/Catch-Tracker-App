import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DateTime from './EditCatchSections.js/DateTime'
import Location from './EditCatchSections.js/Location';
import Weather from './EditCatchSections.js/Weather'
import Fish from './EditCatchSections.js/Fish';
import Fly from './EditCatchSections.js/Fly'
import { Button, FormControl } from 'react-bootstrap';
import './EditCatch.css';
import axios from 'axios';

function Edit(props){
  const { setEdit, setRefresh, setShowOptions } = props
  const { catch_id, details } = props.userCatch

  const dispatch = useDispatch()
  const reduxState = useSelector(state => state)
  const [Details, setDetails] = useState(details)
  const [section, setSection] = useState('') 

  const handleSave = async() => {
    const res = await axios.put(`/api/edit-catch/${catch_id}`, reduxState)
    if(res.data){
      dispatch({type: 'CATCH', payload: res.data})
      setEdit()
      setRefresh()
      dispatch({type: 'CLEAR_CATCH'})
    }
  };

  return(
    <div className='Edit'>
      <button className='x-btn' onClick={() => dispatch({type: 'CLEAR_CATCH'})/setEdit()/setShowOptions()}>X</button>
      <h5 className={(section === 'date/time')? 'selected': 'section'} onClick={() => (section === 'date/time')? setSection(''):setSection('date/time')}>Date/Time</h5>
      {(section === 'date/time') &&
        <DateTime />
      }
      <h5 className={(section === 'location')? 'selected': 'section'} onClick={() => (section === 'location')? setSection(''): setSection('location')}>Location</h5>
        {(section === 'location') && 
          <Location /> 
        }
      <h5 className={(section === 'weather')? 'selected': 'section'} onClick={() => (section === 'weather')? setSection(''): setSection('weather')}>Weather</h5>
      {(section === 'weather') && 
        <Weather />
      }
      <h5 className={(section === 'fish')? 'selected': 'section'} onClick={() => (section === 'fish')? setSection(''): setSection('fish')}>Fish</h5>
        {(section === 'fish') && 
          <Fish Image={Image} />
        }
      <h5 className={(section === 'fly')? 'selected': 'section'} onClick={() => (section === 'fly')? setSection(''): setSection('fly')}>Fly</h5>
      {(section === 'fly') && 
        <Fly />
      }
      <h5 className={(section === 'details')? 'selected': 'section'} onClick={() => (section === 'details')? setSection(''): setSection('details')}>Details</h5>
      {(section === 'details') && 
        <div className='section-info'>
          <FormControl 
            className='text-area'
            as='textarea' 
            rows='4' 
            max-cols='50' 
            value={Details || ''} 
            onChange={e => setDetails(e.target.value)}
          /> 
        </div>
      }
      <br/>
      <Button variant='dark' size='sm' onClick={handleSave}>save</Button>
    </div>
  )
};

export default Edit;