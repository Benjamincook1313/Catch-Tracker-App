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

  const kindOfWeather = () => {
    if(Weather === weather[0]){return `and ${Weather+'ny'}`}
    if(Weather === weather[4]){return `and ${Weather+'ing'}`}
    if(Temp === temp[0] && Weather === weather[2]){return Weather}
    else{return `and ${Weather+'y'}`}
  };

  return(
    <div className='Weather'>
      <h2>What is the Weather like ?</h2>
      <h4>{(Weather && Temp) && `${Temp.split(' ').shift()} ${kindOfWeather()}`}</h4>
      <div>
        <div className="btn-group btn-group-toggle" data-toggle="buttons">
          <label className="btn btn-secondary" onClick={() => dispatch({type: 'TEMP', payload: temp[0]})}>
            <input type="radio" name="temp" id="option1" /> {temp[0]}
          </label>
          <label className="btn btn-secondary" onClick={() => dispatch({type: 'TEMP', payload: temp[1]})}>
            <input type="radio" name="temp" id="option2" /> {temp[1]}
          </label>
          <label className="btn btn-secondary" onClick={() => dispatch({type: 'TEMP', payload: temp[2]})}>
            <input type="radio" name="temp" id="option3" /> {temp[2]}
          </label>
          <label className="btn btn-secondary" onClick={() => dispatch({type: 'TEMP', payload: temp[3]})}>
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
          <label className="btn btn-light" onClick={() => dispatch({type: 'WEATHER', payload: weather[0]})} >
            <input type="radio" name="options" id="option1" /> {weather[0]}
          </label>
          <label className="btn btn-light" onClick={() => dispatch({type: 'WEATHER', payload: weather[1]})} >
            <input type="radio" name="options" id="option2"/> {weather[1]}
          </label>
          <label className="btn btn-light" onClick={() => dispatch({type: 'WEATHER', payload: weather[2]})} >
            <input type="radio" name="options" id="option3"/> {weather[2]}
          </label>
          <label className="btn btn-light" onClick={() => dispatch({type: 'WEATHER', payload: weather[3]})} >
            <input type="radio" name="options" id="option3"/> {weather[3]}
          </label>
          <label className="btn btn-light" onClick={() => dispatch({type: 'WEATHER', payload: weather[4]})} >
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