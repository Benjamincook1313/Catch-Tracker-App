import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

function Wheather(){
  const dispatch = useDispatch();
  const Wheather = useSelector(state => state.wheather);
  const Temp = useSelector(state => state.temp);
  const [showTemp, setShowTemp] = useState(false);

  const wheather = ['Sunny', 'Cloudy', 'Rainy', 'Snowy'];
  const temp = ['Freezing (below 32°)', 'Cold (32° - 60°)', 'Warm (60° - 85°)', 'Hot (Above 85°)', `${Temp}`];

  return(
    <div className='Wheather'>
      <h2>What is the Weather like ?</h2>
      <h4>{(Wheather && Temp) && `${Temp} and ${Wheather}`}</h4>
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
      <br/>
      <div> 
        <div className="btn-group btn-group-toggle" data-toggle="buttons">
          <label className="btn btn-light" onClick={() => dispatch({type: 'WHEATHER', payload: wheather[0]})} >
            <input type="radio" name="options" id="option1" /> {wheather[0]}
          </label>
          <label className="btn btn-light" onClick={() => dispatch({type: 'WHEATHER', payload: wheather[1]})} >
            <input type="radio" name="options" id="option2"/> {wheather[1]}
          </label>
          <label className="btn btn-light" onClick={() => dispatch({type: 'WHEATHER', payload: wheather[2]})} >
            <input type="radio" name="options" id="option3"/> {wheather[2]}
          </label>
          <label className="btn btn-light" onClick={() => dispatch({type: 'WHEATHER', payload: wheather[3]})} >
            <input type="radio" name="options" id="option3"/> {wheather[3]}
          </label>
        </div>
        {showTemp && <input type='text' value={Temp} onChange={e => dispatch({type: 'WHEATHER', payload: e.target.value})}/>}
      </div>
      <br/>
      <div>
        <input type='button' value={'< Back'} onClick={() => (Wheather && Temp)? dispatch({type: 'BACK'}): alert('must select wheather & temp before continuing')}/>
        <input type='button' value='Next >' onClick={() => dispatch({type: 'NEXT'})}/> 
      </div>
    </div>
  )
};

export default Wheather;