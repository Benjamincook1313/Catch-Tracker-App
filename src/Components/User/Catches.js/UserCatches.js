import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import Carousel from '../Carousel./Carousel';
import EditCatch from './Edit/EditCatch';
import Catch from './Catch';
import './User.css';

function MyCatches(){
  const Catches = useSelector(state => state.catches)
  const [showAll, setShowAll] = useState(true)

  let userCatch = Catches.map((userCatch, i) => {
    return (
      <Catch key={i} userCatch={userCatch}/>
    )
  });

  return (
    <div className='UserCatches' >
      <div className='carousel-wrapper'>
        <Carousel />
      </div>
      <br/>
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

export default MyCatches;