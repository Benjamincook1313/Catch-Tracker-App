import React, { useState } from 'react';

function Location(props){
  const today=()=>{
    let month = new Date().getMonth()
    let day = new Date().getDate()
    let year = new Date().getFullYear()
    return `${year}-${month<10? `0${month +1}`: month + 1}-${day<10? `0${day}`: day}`
  }

  const tod = ['early Morning (before 7am)', 'Morning (7am - 11am)', 'Noon (11am - 1pm)', 'after Noon (1pm - 4pm)', 'Evening (4pm - 7pm)', 'Night (after 7pm)'];
  const States = [
    "Alaska", "Alabama", "Arkansas", "Arizona", "California", "Colorado", "Connecticut", "Delaware", "Florida","Georgia",
    "Hawaii", "Iowa", "Idaho", "Illinois", "Indiana", "Kansas","Kentucky","Louisiana","Massachusetts","Maryland","Maine", 
    "Michigan", "Minnesota","Missouri", "Mississippi","Montana","North Carolina"," North Dakota","Nebraska","New Hampshire","New Jersey", 
    "New Mexico", "Nevada", "New York", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", 
    "South Dakota", "Tennessee", "Texas", "Utah", "Virginia", "Vermont", "Washington", "Wisconsin", "West Virginia", "Wyoming"
  ];

  const [Day, setDay] = useState(today())
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

  // const capitalizeFirst=(str)=>{
  //   const arr = str.split('')
  //   const holder = []
  //   for(let i=0; i<=arr.length; i++){
  //     if(!arr[i-1] || arr[i-1] === ' '){
  //       holder.push(arr[i].toUpperCase())
  //     }else{
  //       holder.push(arr[i])
  //     }
  //   }
  //   const answer = holder.join(' ')
  //   return answer
  // };

  return(
    <div className='Form1' >
      <h2>Where was your catch?</h2>
      <div >
        <h5>{(Day && TOD) && `${TOD} ${Day}`}</h5>
        <h4>{(WaterType && WaterName) && `${WaterName} ${WaterType}`}</h4>
        <h4>{State && `${State}`}</h4>
      </div>
      <div>
        <div className='list'>
          <input type="date" value={Day} onChange={e => setDay(e.target.value)} />
          <input value={TOD} placeholder='time of day' onClick={() => setShowTOD(true)} onChange={e => setTOD(e.target.value)} />
          {showTOD && todList}
        </div>
      </div>
        <input 
          className='state'
          value={State} 
          type='text'
          placeholder='state'
          onClick={() => setShowStates(true)}
          onChange={e => setState(e.target.value)}
          onKeyPress={() => setShowStates(true)}
        />
        {(showStates || State) && <button onClick={() => setShowStates(false)/setState('')}>x</button>}
      <div className='list'>{showStates && stateList}</div>
      <br/>
      <div>
        <button className='type' onClick={() => setWaterType('River')}>River</button>
        <button className='type' onClick={() => setWaterType('Creek')}>Creek</button>
        <button className='type' onClick={() => setWaterType('Lake')}>Lake</button>
        <button className='type' onClick={() => setWaterType('Reservoir')}>Reservoir</button>
        <button className='type' onClick={() => setWaterType('Pond')}>Pond</button>
      </div>
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