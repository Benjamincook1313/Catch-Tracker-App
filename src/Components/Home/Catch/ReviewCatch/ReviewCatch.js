import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import Fish from '../../../../Images/fish.png'
import Swal from 'sweetalert2';
import axios from 'axios';
import './ReviewCatch.css';

function ReviewCatch(props){
  const { refresh } = props
  const dispatch = useDispatch()
  const reduxState = useSelector(state => state)
  const { day, tod, waterName, waterType, usState, temp, 
    weather, image, length, species, fishType, size, color, fly, flyType, details } = reduxState
  
  const saveCatch = async () => {
    const res = await axios.post('/api/saveCatch', reduxState)
    if(res.data){
      Swal.fire({type: 'success', title: 'Catch Saved', showConfirmButton: false, timer: 2000, toast: true})
      dispatch({type: 'CLEAR_CATCH'})
      refresh()
    }
  };

  return(
    <div className='ReviewCatch'>
      <h1>New Catch Review</h1>
      <h5><div>{`${tod} ${day}`}</div>  <div>{`${temp}-${weather}`}</div></h5>
      <h2>{`${length} ${species} ${fishType}`}</h2> 
      <img src={image? image: Fish} alt='' height='200' />
      <h3>{`${waterName} ${waterType}, ${usState}`}</h3> 
      <h4>{`size ${size}, ${color} ${fly} - ${flyType}`}</h4>
        Details
      <div className='column'>
        <textarea rows='5' cols='50' value={details} onChange={e => dispatch({type: 'DETAILS', payload: e.target.value})} />
      </div>
      <br/>
      <div >
          <Button className='page-nav' variant='dark' onClick={() => dispatch({type: 'BACK'})}>{'< Back'}</Button>
          <Button className='page-nav' variant='dark' onClick={saveCatch}>Save</Button>
      </div>
    </div>
  )
};

export default ReviewCatch;