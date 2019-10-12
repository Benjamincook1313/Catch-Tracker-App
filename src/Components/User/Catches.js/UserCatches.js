import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import Carousel from '../Carousel./Carousel';
import Catch from './Catch';
import './User.css';

function UserCatches(props){
  const Catches = useSelector(state => state.catches)
  const [showAll, setShowAll] = useState(true)

  let userCatch = Catches.map((userCatch, i) => {
    return (
      <Catch key={userCatch.catch_id} userCatch={userCatch} setRefresh={props.setRefresh} />
    )
  });

  return (
    <div className='UserCatches' >
      <div className='carousel-wrapper'>
        <Carousel />
      </div>
      <Button variant='light' onClick={() => setShowAll(!showAll)}>All Catches</Button>
      <br/>
      {showAll &&
        <div className='userCatch'>
          {userCatch}
        </div>
      }
    </div>
  )
};

export default UserCatches;