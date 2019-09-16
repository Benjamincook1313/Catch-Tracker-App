import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { OverlayTrigger, Tooltip, ToggleButton, ButtonGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSnowflake, faCloudRain, faCloudSunRain, faCloudSun, faSun, faCloud } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2';

function Weather(){
  const dispatch = useDispatch();
  const Weather = useSelector(state => state.weather);
  const Temp = useSelector(state => state.temp);
  const [showTemp, setShowTemp] = useState(false);

  const Sun = <FontAwesomeIcon className='weather-icon' icon={faSun} />
  const Cloud = <FontAwesomeIcon className='weather-icon' icon={faCloud}/>
  const Rain = <FontAwesomeIcon className='weather-icon' icon={faCloudRain}/>
  const Snow = <FontAwesomeIcon className='weather-icon' icon={faSnowflake}/>
  const Pc = <FontAwesomeIcon className='weather-icon' icon={faCloudSun}/>
  const Pcr = <FontAwesomeIcon className='weather-icon' icon={faCloudSunRain}/>

  const temp = ['Freezing <32°', 'Cold 32°- 60°', 'Warm 60°- 85°', 'Hot 85°>', `${Temp}`];

  // const kindOfWeather = (weather) => {
  //   let temp = ''
  //   switch(weather){
  //     case 'Rain':
  //       temp = 'Rainy'
  //       break;
  //     case 'Cloud':
  //       temp = 'Cloudy'
  //       break;
  //     case 'Sun':
  //       temp = 'Sunny'
  //       break;
  //     case 'Snow':
  //       temp = 'Snowy'
  //       break;
  //     case 'Hail':
  //       temp = 'Hailing'
  //       break;
  //     default:
  //       temp = ''
  //   }
  //   return temp
  // };

  return(
    <div className='Weather'>
      <h2>What is the Weather like ?</h2>
      <h4>{(Weather && Temp) && `${Temp} and ${Weather}`}</h4>
      <div>
        <div className="btn-group btn-group-toggle" data-toggle="buttons">
          <label className="btn btn-secondary" onClick={() => dispatch({type: 'TEMP', payload: temp[0].split(' ').shift()})/setShowTemp(false)}>
            <input type="radio" name="temp" id="option1" /> {temp[0]}
          </label>
          <label className="btn btn-secondary" onClick={() => dispatch({type: 'TEMP', payload: temp[1].split(' ').shift()})/setShowTemp(false)}>
            <input type="radio" name="temp" id="option2" /> {temp[1]}
          </label>
          <label className="btn btn-secondary" onClick={() => dispatch({type: 'TEMP', payload: temp[2].split(' ').shift()})/setShowTemp(false)}>
            <input type="radio" name="temp" id="option3" /> {temp[2]}
          </label>
          <label className="btn btn-secondary" onClick={() => dispatch({type: 'TEMP', payload: temp[3].split(' ').shift()})/setShowTemp(false)}>
            <input type="radio" name="temp" id="option4" /> {temp[3]}
          </label>
          <label className="btn btn-secondary" onClick={() => setShowTemp(true)} >
            <input type="radio" name="options" id="option4"/> Other
          </label>
        </div>
      </div>
        <div>
          {showTemp && <input type='text' value={Temp} onChange={e => dispatch({type: 'TEMP', payload: e.target.value})}/>}
        </div>
      <br/>
      <div> 
      <ButtonGroup toggle>
        <OverlayTrigger overlay={<Tooltip id="tooltip">Sunny</Tooltip>}>
          <ToggleButton variant='light' type='radio' name='weather' onClick={() => dispatch({type: 'WEATHER', payload: 'Sunny'})}>
            {Sun}
          </ToggleButton>
        </OverlayTrigger>
        <OverlayTrigger overlay={<Tooltip id="tooltip">partly-cloudy</Tooltip>}>
          <ToggleButton variant='light' type='radio' name='weather' onClick={() => dispatch({type: 'WEATHER', payload: 'Partly-Cloudy'})}>
            {Pc}
          </ToggleButton>
        </OverlayTrigger>
        <OverlayTrigger overlay={<Tooltip id="tooltip">cloudy</Tooltip>}>
          <ToggleButton variant='light' type='radio' name='weather' onClick={() => dispatch({type: 'WEATHER', payload: 'Cloudy'})}>
            {Cloud}
          </ToggleButton>
        </OverlayTrigger>
        <OverlayTrigger overlay={<Tooltip id="tooltip">light-showers</Tooltip>}>
          <ToggleButton variant='light' type='radio' name='weather' onClick={() => dispatch({type: 'WEATHER', payload: 'Light-Showers'})}>
            {Pcr}
          </ToggleButton>
        </OverlayTrigger>
        <OverlayTrigger overlay={<Tooltip id="tooltip">rainy</Tooltip>}>
          <ToggleButton variant='light' type='radio' name='weather' onClick={() => dispatch({type: 'WEATHER', payload: 'Rainy'})}>
            {Rain}
          </ToggleButton>
        </OverlayTrigger>
        <OverlayTrigger overlay={<Tooltip id="tooltip">snow</Tooltip>} >
          <ToggleButton variant='light' type='radio' name='weather' onClick={() => dispatch({type: 'WEATHER', payload: 'Snowy'})}>
            {Snow}
          </ToggleButton>
        </OverlayTrigger>
      </ButtonGroup>
      </div>
      <br/>
      <div>
        <input className='btn btn-dark' type='button' value='< Back' onClick={() => dispatch({type: 'BACK'})}/> 
        <input className='btn btn-dark' type='button' value={'Next >'} onClick={() => (Weather && Temp)? dispatch({type: 'NEXT'}): 
          Swal.fire({type: 'warning', title: `must select weather & temp before continuing`, showConfirmButton: false, timer: 3000 })}
        />
      </div>
    </div>
  )
};

export default Weather;