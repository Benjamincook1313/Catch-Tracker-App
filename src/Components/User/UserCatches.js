import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Catch from './Catch';
import axios from 'axios';
import './UserCatches.css'

function MyCatches(props){
  const dispatch = useDispatch()
  // const user = useSelector(state => state.user)
  const catches = useSelector(state => state.catches)

  useEffect(() => {
    
  });

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
      <h1>My Catches will appear hear.</h1>
      <div className='userCatch' >{userCatch}</div>
    </div>
  )
};

export default MyCatches;