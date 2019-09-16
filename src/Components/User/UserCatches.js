import React from 'react';
import { useSelector } from 'react-redux';
import Catch from './Catch';
import './User.css';

function MyCatches(props){
  const catches = useSelector(state => state.catches)

  let userCatch = catches.map((myCatch) => {
    return (
      <Catch 
        key={myCatch.catch_id}
        myCatch={myCatch}
      />
    )
  })

  return (
    <div className='UserCatches' >
      <div className='userCatch'>{userCatch}</div>
    </div>
  )
};

export default MyCatches;