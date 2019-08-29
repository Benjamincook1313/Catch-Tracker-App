import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Catch from './Catch';
import axios from 'axios';

function MyCatches(props){
  const dispatch = useDispatch()
  // const user = useSelector(state => state.user)
  const catches = useSelector(state => state.catches)

  useEffect(() => {
    axios.get(`/api/catches`).then(res => {
      if(res.data){
        dispatch({type: 'CATCHES', payload: res.data})
      }
    })
  }, [dispatch]);

  let userCatch = catches.map((userCatch) => {
    return (
      <Catch 
        key={userCatch.catch_id}
      />
    )
  })

  return (
    <div>
      <h1>My Catches will appear hear.</h1>
      {userCatch}
    </div>
  )
};

export default MyCatches;