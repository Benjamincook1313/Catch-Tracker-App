import React, { useEffect, useState } from 'react';
import { storage } from '../../Firebase/index';
import { useSelector } from 'react-redux';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

function Catch(props){
  const { date, tod, water_name, water_type, state, temperature, 
    weather, image_name, length, fish_type, species, fly, fly_type, comments } = props.myCatch

  const user = useSelector(state => state.user)
  const [Image, setImage] = useState('')

  useEffect(() => {
    if(user.user_name){
      storage.ref(`images/${user.user_name}`).child(image_name).getDownloadURL().then(url => {
        setImage(url)
      })
    }
  })

  return(
    <div className='Catch'>
      <OverlayTrigger overlay={
        <Tooltip>
          <h6>Weather</h6> <p>{` ${temperature}, ${weather}`}</p>
          <h6>Fish</h6> <p>{`${length}" ${species} ${fish_type}`}</p> 
          <h6>Fly</h6> <p>{`${fly}, ${fly_type}`}</p>
        </Tooltip>
        }>
        <div className='catch'>
          <div className='date-location'>
            <p className='date'>{date}</p>
            <div className='location'>
              <h5>{`${water_name} ${water_type}`}</h5> 
              <h4>{`${state}`}</h4>
            </div>
          </div>
          <img src={Image} alt='' height='200' />
          <p className='comment'>{comments}</p>
        </div>
      </OverlayTrigger>
    </div>
  )
};

export default Catch;