import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Location(props){
  const tod = ['EarlyMorning (before-7am)', 'Morning (7am-11am)', 'Noon (11am-1pm)', 'Mid-day (1pm-4pm)', 'Evening (4pm-7pm)', 'Night (after-7pm)'];
  const States = [
    "Alaska", "Alabama", "Arkansas", "Arizona", "California", "Colorado", "Connecticut", "Delaware", "Florida","Georgia",
    "Hawaii", "Iowa", "Idaho", "Illinois", "Indiana", "Kansas","Kentucky","Louisiana","Massachusetts","Maryland","Maine", 
    "Michigan", "Minnesota","Missouri", "Mississippi","Montana","North Carolina"," North Dakota","Nebraska","New Hampshire","New Jersey", 
    "New Mexico", "Nevada", "New York", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", 
    "South Dakota", "Tennessee", "Texas", "Utah", "Virginia", "Vermont", "Washington", "Wisconsin", "West Virginia", "Wyoming"
  ];

  const dispatch = useDispatch();
  const Day = useSelector(state => state.day);
  const TOD = useSelector(state => state.tod);
  const State = useSelector(state => state.usState);
  const WaterType = useSelector(state => state.waterType);
  const WaterName = useSelector(state => state.waterName);

  const [showTOD, setShowTOD] = useState(false);
  const [showStates, setShowStates] = useState(false);

  const filteredStates = States.filter(state => state.toLowerCase().startsWith(State));
  const stateList = filteredStates.map((state, i) => (
    <div className='list-item' key={i} value={filteredStates[i] || `${state}`}  
      onClick={(e) => dispatch({type: 'US_STATE', payload: filteredStates[i]})/
      setShowStates(false)}
    >
    {`${state}`}
    </div>
  ));

  const todList = tod.map((item, i) => (
    <div className='list-item' key={i} value={tod[i] || tod}  
      onClick={(e) => dispatch({type: 'TOD', payload: tod[i]})/setShowTOD(false)}>
      {item}
    </div>)
  );

const today = () => {
    let month = new Date().getMonth()+1
    let day = new Date().getDate()
    let year = new Date().getFullYear()
    switch(month){
      case 1:
        return `Jan ${day}, ${year}`
      case 2:
        return `Feb ${day}, ${year}`
      case 3:
        return `Mar ${day}, ${year}`
      case 4:
        return `Apr ${day}, ${year}`
      case 5:
        return `May ${day}, ${year}`
      case 6:
        return `June ${day}, ${year}`
      case 7:
        return `July ${day}, ${year}`
      case 8:
        return `Aug ${day}, ${year}`
      case 9:
        return `Sept ${day}, ${year}`
      case 10:
        return `Oct ${day}, ${year}`
      case 11:
        return `Nov ${day}, ${year}`
      case 12:
        return `Dec ${day}, ${year}`
      default:
        return ''
    }
  };

  return(
    <div className='Location' >
      <h2>Where was your catch?</h2>
      <div >
        <h5>{(Day && TOD) && `${TOD.split(' ').shift()} ${today()}`}</h5>
        <h4>{(WaterType && WaterName) && `${WaterName} ${WaterType}, ${State}`}</h4>
      </div>
      <div>
        <div className='list'>
          <input type="date" value={Day} onChange={e => dispatch({type: 'DAY', payload: e.target.value})}/> {' '}
          <input type='text' value={TOD} placeholder='time of day' onClick={() => setShowTOD(true)} onChange={e => dispatch({type: 'TOD', payload: e.target.value})} />
          {showTOD && <button onClick={() => setShowTOD(false)}>x</button>}
          {showTOD && todList}
        </div>
        <br/>
        <div className="btn-group btn-group-toggle" data-toggle="buttons">
          <label className="btn btn-light" onClick={() => dispatch({type: 'WATER_TYPE', payload: 'River'})} >
            <input type="radio" name="options" id="option1" /> River
          </label>
          <label className="btn btn-light" onClick={() => dispatch({type: 'WATER_TYPE', payload: 'Creek'})} >
            <input type="radio" name="options" id="option2"/> Creek
          </label>
          <label className="btn btn-light" onClick={() => dispatch({type: 'WATER_TYPE', payload: 'Lake'})} >
            <input type="radio" name="options" id="option3"/> Lake
          </label>
          <label className="btn btn-light" onClick={() => dispatch({type: 'WATER_TYPE', payload: 'Reservoir'})} >
            <input type="radio" name="options" id="option3"/> Creek
          </label>
          <label className="btn btn-light" onClick={() => dispatch({type: 'WATER_TYPE', payload: 'Pond'})} >
            <input type="radio" name="options" id="option4"/> Pond
          </label>
        </div>
      <div>
          *<input value={WaterName} type='text' 
            placeholder={`name of ${WaterType.toLowerCase() || 'water'}`}
            onChange={(e) => dispatch({type: 'WATER_NAME', payload: e.target.value})}
          />
        {' ' + WaterType}
      </div>
      <br/>    
      </div>
        *<input className='state' value={State} type='text' placeholder='State'
          onClick={() => setShowStates(true)} onKeyPress={() => setShowStates(true)}
          onChange={e => dispatch({type: 'US_STATE', payload: e.target.value})}
        />
      <div className='list'>{showStates && stateList}</div>
      <br/>
      <div>    
        <input type='button' value='Next >' onClick={() => dispatch({type: 'NEXT'})}/> 
      </div>
    </div>
  )
};

export default Location;