import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InputGroup, Dropdown, FormControl, DropdownButton } from 'react-bootstrap';


function EditWeather(){
  const dispatch = useDispatch()
  const Weather = useSelector(state => state.weather)
  const Temp = useSelector(state => state.temp)

  return(
    <div className='Edit-Section'>
      <InputGroup className='weatherGroup' >
        <DropdownButton as={InputGroup.Prepend} variant="outline-secondary" title={Temp} >
          <Dropdown.Item onClick={() => dispatch({type: 'TEMP', payload: 'Freezing'})}>{'Freezing < 32°'}</Dropdown.Item>
          <Dropdown.Item onClick={() => dispatch({type: 'TEMP', payload: 'Cold'})}>{'Cold 32°- 60°'}</Dropdown.Item>
          <Dropdown.Item onClick={() => dispatch({type: 'TEMP', payload: 'Warm'})}>{'Warm 60°- 85°'}</Dropdown.Item>
          <Dropdown.Item onClick={() => dispatch({type: 'TEMP', payload: 'Hot'})}>{'Hot > 85°'}</Dropdown.Item>
        </DropdownButton>
        <DropdownButton as={InputGroup.Append} variant="outline-secondary" title={Weather} >
          <Dropdown.Item onClick={() => dispatch({type: 'WEATHER', payload: 'Snow'})}>Snowy</Dropdown.Item>
          <Dropdown.Item onClick={() => dispatch({type: 'WEATHER', payload: 'Rainy'})}>Rainy</Dropdown.Item>
          <Dropdown.Item onClick={() => dispatch({type: 'WEATHER', payload: 'Light-Showers'})}>Light-Showers</Dropdown.Item>
          <Dropdown.Item onClick={() => dispatch({type: 'WEATHER', payload: 'Partly-Cloudy'})}>Partly-Cloudy</Dropdown.Item>
          <Dropdown.Item onClick={() => dispatch({type: 'WEATHER', payload: 'Cloudy'})}>Cloudy</Dropdown.Item>
          <Dropdown.Item onClick={() => dispatch({type: 'WEATHER', payload: 'Sunny'})}>Sunny</Dropdown.Item>
        </DropdownButton>
      </InputGroup>
    </div>
  )
};

export default EditWeather;