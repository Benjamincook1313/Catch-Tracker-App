import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { OverlayTrigger, Tooltip, ToggleButton, ButtonGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSnowflake, faCloudRain, faCloudSunRain, faCloudSun, faSun, faCloud } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2';
import './Catch.css'

function Weather(){
  const dispatch = useDispatch();
  const Weather = useSelector(state => state.weather);
  const Temp = useSelector(state => state.temp);
  const [showTemp, setShowTemp] = useState(false);

  const Sun = <FontAwesomeIcon className='weather-icon sun' icon={faSun} />
  const Cloud = <FontAwesomeIcon className='weather-icon cloud' icon={faCloud}/>
  const Rain = <FontAwesomeIcon className='weather-icon rain' icon={faCloudRain}/>
  const Snow = <FontAwesomeIcon className='weather-icon snow' icon={faSnowflake}/>
  const Pc = <FontAwesomeIcon className='weather-icon pc' icon={faCloudSun}/>
  const Pcr = <FontAwesomeIcon className='weather-icon pcr' icon={faCloudSunRain}/>

  const kindOfWeather = (Weather) => {
    switch(Weather){
      case 'Rainy':
        return Rain
      case 'Cloudy':
        return Cloud
      case 'Sunny':
        return Sun
      case 'Snowy':
        return Snow
      case 'Partly-Cloudy':
        return Pc
      case 'Light-Showers':
        return Pcr
      default:
        return ''
    }
  };

  const handleNext=()=>{
    if(Weather && Temp){
      dispatch({type: 'NEXT'})
    }else{ 
      Swal.fire({
        type: 'warning', 
        title: `must select weather & temp before continuing`, 
        showConfirmButton: false, timer: 3000,
        toast: true, position: 'top'
      })
    }
  };

  return(
    <div className='Weather'>
      <h2 className='weather-title'>Weather</h2>
      <div className='preview'>
        {(Weather && Temp) && 
          <h4>{kindOfWeather(Weather)} {isNaN(Temp)? Temp: Temp+'°'} {kindOfWeather(Weather)}</h4>
        }
      </div>
      <ButtonGroup toggle className='ButtonGroup'>
        <OverlayTrigger overlay={<Tooltip id="tooltip">{'< 32°'}</Tooltip>}>
          <ToggleButton variant='light' type='radio' name='temp' 
            onClick={() => dispatch({type: 'TEMP', payload: 'freezing'})/setShowTemp(false)}>
            <div className='weather-btn'>Freezing</div>
          </ToggleButton>
        </OverlayTrigger>
        <OverlayTrigger overlay={<Tooltip id="tooltip">{'32°- 60°'}</Tooltip>}>
          <ToggleButton variant='light' type='radio' name='temp' 
            onClick={() => dispatch({type: 'TEMP', payload: 'cold'})/setShowTemp(false)}>
            <div className='weather-btn'>Cold</div>
          </ToggleButton>
        </OverlayTrigger>
        <OverlayTrigger overlay={<Tooltip id="tooltip">{'60°- 85°'}</Tooltip>}>
          <ToggleButton variant='light' type='radio' name='temp' 
            onClick={() => dispatch({type: 'TEMP', payload: 'warm'})/setShowTemp(false)}>
            <div className='weather-btn'>Warm</div>
          </ToggleButton>
        </OverlayTrigger>
        <OverlayTrigger overlay={<Tooltip id="tooltip">{'85° >'}</Tooltip>}>
          <ToggleButton variant='light' type='radio' name='temp' 
            onClick={() => dispatch({type: 'TEMP', payload: 'hot'})/setShowTemp(false)}>
            <div className='weather-btn'>Hot</div>
          </ToggleButton>
        </OverlayTrigger>
        <OverlayTrigger overlay={<Tooltip id="tooltip">{'specific temp'}</Tooltip>}>
          <ToggleButton variant='light' type='radio' name='temp' 
            onClick={() => dispatch({type: 'TEMP'})/setShowTemp(true)}>
            <div className='weather-btn'>Other</div>
          </ToggleButton>
        </OverlayTrigger>
      </ButtonGroup>
      <div>
        {showTemp && 
          <div className='specific-temp'>
            <input type='text' value={Temp} onChange={e => dispatch({type: 'TEMP', payload: e.target.value})}/>
            {'°'}
          </div>
        }
      </div>
      <div> 
      <ButtonGroup className='ButtonGroup' toggle>
        <OverlayTrigger overlay={<Tooltip id="tooltip">snow</Tooltip>} >
          <ToggleButton variant='dark' type='radio' name='weather' 
            onClick={() => dispatch({type: 'WEATHER', payload: 'Snowy'})}>
            {Snow}
          </ToggleButton>
        </OverlayTrigger>
        <OverlayTrigger overlay={<Tooltip id="tooltip">rainy</Tooltip>}>
          <ToggleButton variant='dark' type='radio' name='weather' 
            onClick={() => dispatch({type: 'WEATHER', payload: 'Rainy'})}>
            {Rain}
          </ToggleButton>
        </OverlayTrigger>
        <OverlayTrigger overlay={<Tooltip id="tooltip">light-showers</Tooltip>}>
          <ToggleButton variant='dark' type='radio' name='weather' 
            onClick={() => dispatch({type: 'WEATHER', payload: 'Light-Showers'})}>
            {Pcr}
          </ToggleButton>
        </OverlayTrigger>
        <OverlayTrigger overlay={<Tooltip id="tooltip">cloudy</Tooltip>}>
          <ToggleButton variant='dark' type='radio' name='weather' 
            onClick={() => dispatch({type: 'WEATHER', payload: 'Cloudy'})}>
            {Cloud}
          </ToggleButton>
        </OverlayTrigger>
        <OverlayTrigger overlay={<Tooltip id="tooltip">partly-cloudy</Tooltip>}>
          <ToggleButton variant='dark' type='radio' name='weather' 
            onClick={() => dispatch({type: 'WEATHER', payload: 'Partly-Cloudy'})}>
            {Pc}
          </ToggleButton>
        </OverlayTrigger>
        <OverlayTrigger overlay={<Tooltip id="tooltip">Sunny</Tooltip>}>
          <ToggleButton variant='dark' type='radio' name='weather' 
            onClick={() => dispatch({type: 'WEATHER', payload: 'Sunny'})}>
            {Sun}
          </ToggleButton>
        </OverlayTrigger>
      </ButtonGroup>
      </div>
      <br/>
      <div>
        <Button className='page-nav' variant='dark' onClick={() => dispatch({type: 'BACK'})}>{'< Back'}</Button> 
        <Button className='page-nav' variant='dark' onClick={handleNext}>
          {'Next >'}
        </Button>
      </div>
    </div>
  )
};

export default Weather;