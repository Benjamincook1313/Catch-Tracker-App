import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


function EditWeather(){
  const dispatch = useDispatch()
  const Weather = useSelector(state => state.weather)
  const Temp = useSelector(state => state.temp)

  return(
    <div className='edit-weather'>
      <p>EditWeather</p>
    </div>
  )
};

export default EditWeather;