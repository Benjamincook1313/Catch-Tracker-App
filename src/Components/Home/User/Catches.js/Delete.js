import React from 'react';
import {Button} from 'react-bootstrap';


function Delete(props){
  const { setShowOptions, cancel, handleDelete } = props

  return(
    <div className='Delete'>
      <button className='d-x-btn' onClick={() => cancel()/setShowOptions()}>X</button>
      <h3>are you sure you want to delete this catch?</h3>
      <div className='d-btn'>
        <Button variant='light' onClick={cancel}>no</Button>
        <Button variant='light' onClick={handleDelete}>yes</Button>
      </div>
    </div>
  )
};

export default Delete;