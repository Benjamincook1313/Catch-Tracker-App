import React, { useState } from 'react';

function Location(props){

  const tod = ['EarlyMorning (before 7am)', 'Morning (7am - 11am)', 'Noon (11am - 1pm)', 'Afternoon (1pm - 4pm)', 'Evening (4pm - 7pm)', 'Night (after 7pm)'];
  const States = [
    "Alaska", "Alabama", "Arkansas", "Arizona", "California", "Colorado", "Connecticut", "Delaware", "Florida","Georgia",
    "Hawaii", "Iowa", "Idaho", "Illinois", "Indiana", "Kansas","Kentucky","Louisiana","Massachusetts","Maryland","Maine", 
    "Michigan", "Minnesota","Missouri", "Mississippi","Montana","North Carolina"," North Dakota","Nebraska","New Hampshire","New Jersey", 
    "New Mexico", "Nevada", "New York", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", 
    "South Dakota", "Tennessee", "Texas", "Utah", "Virginia", "Vermont", "Washington", "Wisconsin", "West Virginia", "Wyoming"
  ];


  const [Date, setDate] = useState(`yyyy-mm-dd`)
  const [TOD, setTOD] = useState('');
  const [showTOD, setShowTOD] = useState(false);

  const [showStates, setShowStates] = useState(false);
  const [State, setState] = useState('');

  const [WaterType, setWaterType] = useState('');
  const [WaterName, setWaterName] = useState('');


  const filteredStates = States.filter(state => state.toLowerCase().startsWith(State))
  const stateList = filteredStates.map((state, i) => (
  <div className='list-item' key={i} value={filteredStates[i] || state}  
    onClick={(e) => setState(filteredStates[i])/
    setShowStates(false)}
  >{state}
  </div>));

  const todList = tod.map((item, i) => (
    <div className='list-item' key={i} value={tod[i] || tod}  
      onClick={(e) => setTOD(tod[i])/setShowTOD(false)}>
      {item}
    </div>)
  );

  const capitalizeFirst=(str)=>{
    const arr = str.split('')
    const holder = []
    for(let i=0; i<=arr.length; i++){
      if(!arr[i-1] || arr[i-1] === ' '){
        holder.push(arr[i].toUpperCase())
      }else{
        holder.push(arr[i])
      }
    }
    const answer = holder.join(' ')
    return answer
  };

  return(
    <div className='Form1' >
      <h2>Where was your catch?</h2>
      <h5>{(Date && TOD) && `${TOD} ${Date}`}</h5>
      <h4>{(State && WaterName && State) && `${WaterName} ${WaterType}, ${State}`}</h4>
      <br/>
      <span>
        <div className='list'>
          <input type="date" value={Date} onChange={e => setDate(e.target.value)} />
          <input value={TOD} placeholder='time of day' onClick={() => setShowTOD(true)} onChange={e => setTOD(e.target.value)} />
          {showTOD && todList}
        </div>
      </span>
      <br/>
      <div><input 
          className='state'
          value={State} 
          type='text'
          placeholder='select State'
          onClick={() => setShowStates(true)}
          onChange={e => setState(e.target.value)}
          onKeyPress={() => setShowStates(true)}
        />
        {(showStates || State) && <button onClick={() => setShowStates(false)/setState('')}>x</button>}
      </div>
      <div className='list'>{showStates && stateList}</div>
      <br/>
      <span>
        <button className='type' onClick={() => setWaterType('River')}>River</button>
        <button className='type' onClick={() => setWaterType('Creek')}>Creek</button>
        <button className='type' onClick={() => setWaterType('Lake')}>Lake</button>
        <button className='type' onClick={() => setWaterType('Reservoir')}>Reservoir</button>
        <button className='type' onClick={() => setWaterType('Pond')}>Pond</button>
      </span>
      <div>{WaterType && 
        <input 
          value={WaterName} 
          type='text' 
          onChange={(e) => setWaterName(e.target.value)}
        />}
        {' ' + WaterType}
      </div>
    </div>
  )
};

export default Location;