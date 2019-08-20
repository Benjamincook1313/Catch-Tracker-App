import React, {useState} from 'react';

function Wheather(){

  // const [Selected, setSelected] = useState([])

  const [Wheather, setWheather] = useState('');
  const [Temp, setTemp] = useState();

  const wheather = ['Sunny', 'Cloudy', 'Rainy', 'Snowy'];
  const temp = ['Freezing (below 32°)', 'Cold (32° - 60°)', 'Warm (60° - 85°)', 'Hot (Above 85°)'];

  return(
    <div className='Wheather'>
      <h2>What is the Weather like ?</h2>
      <h4>{(Wheather && Temp) && `${Temp} and ${Wheather}`}</h4>
      <span>
        <div className="btn-group btn-group-toggle" data-toggle="buttons">
          <label className="btn btn-light" onClick={() => setWheather(wheather[3])} >
            <input type="radio" name="options" id="option1" /> {wheather[3]}
          </label>
          <label className="btn btn-light" onClick={() => setWheather(wheather[2])} >
            <input type="radio" name="options" id="option2"/> {wheather[2]}
          </label>
          <label className="btn btn-light" onClick={() => setWheather(wheather[1])} >
            <input type="radio" name="options" id="option3"/> {wheather[1]}
          </label>
          <label className="btn btn-light" onClick={() => setWheather(wheather[0])} >
            <input type="radio" name="options" id="option3"/> {wheather[0]}
          </label>
        </div>
      </span>
      <br/>
      <span>
        <div className="btn-group btn-group-toggle" data-toggle="buttons">
          <label className="btn btn-secondary" onClick={() => setTemp(temp[0])}>
            <input type="radio" name="temp" id="option1" /> {temp[0]}
          </label>
          <label className="btn btn-secondary" onClick={() => setTemp(temp[1])}>
            <input type="radio" name="temp" id="option2" /> {temp[1]}
          </label>
          <label className="btn btn-secondary" onClick={() => setTemp(temp[2])}>
            <input type="radio" name="temp" id="option3" /> {temp[2]}
          </label>
          <label className="btn btn-secondary" onClick={() => setTemp(temp[3])}>
            <input type="radio" name="temp" id="option4" /> {temp[3]}
          </label>
        </div>
      </span>
    </div>
  )
};

export default Wheather;