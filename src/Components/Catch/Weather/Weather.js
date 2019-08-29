import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

function Weather(){
  const dispatch = useDispatch();
  const Weather = useSelector(state => state.weather);
  const Temp = useSelector(state => state.temp);
  const [showTemp, setShowTemp] = useState(false);

  const weather = ['Sun', 'Cloud', 'Rain', 'Snow', 'Hail'];
  const temp = ['Freezing <32°', 'Cold 32°- 60°', 'Warm 60°- 85°', 'Hot 85°>', `${Temp}`];

  const kindOfWeather = (weather) => {
    let temp = ''
    switch(weather){
      case 'Rain':
        temp = 'Rainy'
        break;
      case 'Cloud':
        temp = 'Cloudy'
        break;
      case 'Sun':
        temp = 'Sunny'
        break;
      case 'Snow':
        temp = 'Snowy'
        break;
      case 'Hail':
        temp = 'Hailing'
        break;
      default:
        temp = ''
    }
    return temp
  };

  return(
    <div className='Weather'>
      <h2>What is the Weather like ?</h2>
      <h4>{(Weather && Temp) && `${Temp} and ${Weather}`}</h4>
      <div>
        <div className="btn-group btn-group-toggle" data-toggle="buttons">
          <label className="btn btn-secondary" onClick={() => dispatch({type: 'TEMP', payload: temp[0].split(' ').shift()})}>
            <input type="radio" name="temp" id="option1" /> {temp[0]}
          </label>
          <label className="btn btn-secondary" onClick={() => dispatch({type: 'TEMP', payload: temp[1].split(' ').shift()})}>
            <input type="radio" name="temp" id="option2" /> {temp[1]}
          </label>
          <label className="btn btn-secondary" onClick={() => dispatch({type: 'TEMP', payload: temp[2].split(' ').shift()})}>
            <input type="radio" name="temp" id="option3" /> {temp[2]}
          </label>
          <label className="btn btn-secondary" onClick={() => dispatch({type: 'TEMP', payload: temp[3].split(' ').shift()})}>
            <input type="radio" name="temp" id="option4" /> {temp[3]}
          </label>
          <label className="btn btn-secondary" onClick={() => setShowTemp(true)} >
            <input type="radio" name="options" id="option4"/> Other
          </label>
        </div>
      </div>
        <div>
          {showTemp && <input type='text' value={Temp} onChange={e => dispatch({type: 'WEATHER', payload: e.target.value})}/>}
        </div>
      <br/>
      <div> 
        <div className="btn-group btn-group-toggle" data-toggle="buttons">
          <label className="btn btn-light" onClick={() => dispatch({type: 'WEATHER', payload: kindOfWeather('Sun')})} >
            <input type="radio" name="options" id="option1" /> {weather[0]}
          </label>
          <label className="btn btn-light" onClick={() => dispatch({type: 'WEATHER', payload: kindOfWeather('Cloud')})} >
            <input type="radio" name="options" id="option2"/> {weather[1]}
          </label>
          <label className="btn btn-light" onClick={() => dispatch({type: 'WEATHER', payload: kindOfWeather('Rain')})} >
            <input type="radio" name="options" id="option3"/> {weather[2]}
          </label>
          <label className="btn btn-light" onClick={() => dispatch({type: 'WEATHER', payload: kindOfWeather('Snow')})} >
            <input type="radio" name="options" id="option3"/> {weather[3]}
          </label>
          <label className="btn btn-light" onClick={() => dispatch({type: 'WEATHER', payload: kindOfWeather('Hail')})} >
            <input type="radio" name="options" id="option1" /> {weather[4]}
          </label>
        </div>
      </div>
      <br/>
      <div>
        <input className='btn btn-dark' type='button' value='< Back' onClick={() => dispatch({type: 'BACK'})}/> 
        <input className='btn btn-dark' type='button' value={'Next >'} onClick={() => (Weather && Temp)? dispatch({type: 'NEXT'}): 
          Swal.fire({type: 'warning', title: `must select wheather & temp before continuing`, showConfirmButton: false, timer: 3000 })}
        />
      </div>
    </div>
  )
};

export default Weather;