import React, { useEffect, useState } from 'react';
import { storage } from '../../Firebase/index';
import { useSelector } from 'react-redux';

function Catch(props){
  const { date, time, location, weather, image, fish, fly, } = props.myCatch

  // const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const [Image, setImage] = useState('')

  useEffect(() => {
    if(user.user_name){
      storage.ref(`images/${user.user_name}`).child(image).getDownloadURL().then(url => {
        setImage(url)
      })
    }
  })

  return(
    <div className='Catch'>
      <h5>
        <div>{time+','+date}</div>  
        <div>{weather}</div>
      </h5>
      <h4>{fish}</h4> 
      <img src={Image} alt='' height='300' />
      <h4>{location}</h4> 
      <h3>{fly}</h3>
    </div>
  )
};

export default Catch;