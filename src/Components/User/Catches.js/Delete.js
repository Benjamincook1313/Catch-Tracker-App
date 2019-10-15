import React from 'react';
import {Button} from 'react-bootstrap';


function Delete(props){
  return(
    <div className='Delete'>
      <button className='d-x-btn' onClick={props.cancel}>X</button>
      <h3>are you sure you want to delete this catch?</h3>
      <div className='d-btn'>
        <Button variant='light' onClick={props.cancel}>no</Button>
        <Button variant='light' onClick={props.handleDelete}>yes</Button>
      </div>
    </div>
  )
};

export default Delete;