import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import Carousel from './Carousel./Carousel'
import Catch from './Catch';
import './User.css';

function MyCatches(){
  const Catches = useSelector(state => state.catches)
  const [showAll, setShowAll] = useState(false)

  let userCatch = Catches.map((userCatch) => {
    return (
      <Catch key={userCatch.catch_id} userCatch={userCatch}/>
    )
  });

  return (
    <div className='MyCatches' >
      <Carousel />
      <br/>
      <Button onClick={() => setShowAll(!showAll)}>All Catches</Button>
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