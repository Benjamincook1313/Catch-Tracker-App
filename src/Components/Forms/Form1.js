import React, { useState } from 'react'

function Form1(props){

  const States = [
    "Alaska", "Alabama", "Arkansas", "Arizona", "California", "Colorado", "Connecticut", "Delaware", "Florida","Georgia",
    "Hawaii", "Iowa", "Idaho", "Illinois", "Indiana", "Kansas","Kentucky","Louisiana","Massachusetts","Maryland","Maine", 
    "Michigan", "Minnesota","Missouri", "Mississippi","Montana","North Carolina"," North Dakota","Nebraska","New Hampshire","New Jersey", 
    "New Mexico", "Nevada", "New York", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", 
    "South Dakota", "Tennessee", "Texas", "Utah", "Virginia", "Vermont", "Washington", "Wisconsin", "West Virginia", "Wyoming"
  ];

  const [showStates, setShowStates] = useState(false);
  const [State, setState] = useState('');
  const [River, setRiver] = useState('');

  const stateList = States.filter(state => state === '' || state.toLowerCase().startsWith(State))
  .map((state, i) => (
  <div className='list-item' key={i} value={States[i] || State}  
    onClick={() => setState(States[i])/setShowStates(false)/props.setState(States[i])}>{state}
  </div>));

  return(
    <div className='Form1' >
      <div>State <input 
          value={State} 
          onClick={() => setShowStates(true)} 
          onChange={e => setState(e.target.value.toLowerCase())/props.setState(e.target.value)}
        />
        {showStates && <button onClick={() => setShowStates(false)/setState('')/props.setState('')}>x</button>}
      </div>
      <div className='list'>{showStates && stateList}</div>
      
      <div>River <input value={River} onChange={(e) => setRiver(e.target.value)/props.setRiver(e.target.value)}/></div>
    </div>
  )
};

export default Form1;