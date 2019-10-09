import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InputGroup, FormControl, DropdownButton, Dropdown} from 'react-bootstrap';
import Scroll from 'react-scrollbar';

function EditLocation(){
  const [showStates, setShowStates] = useState(false)
  
  const dispatch = useDispatch()
  const WaterName = useSelector(state => state.waterName)
  const WaterType = useSelector(state => state.waterType)
  const State = useSelector(state => state.usState)

  const States = [
    "Alaska", "Alabama", "Arkansas", "Arizona", "California", "Colorado", "Connecticut", "Delaware", "Florida","Georgia",
    "Hawaii", "Iowa", "Idaho", "Illinois", "Indiana", "Kansas","Kentucky","Louisiana","Massachusetts","Maryland","Maine", 
    "Michigan", "Minnesota","Missouri", "Mississippi","Montana","North Carolina"," North Dakota","Nebraska","New Hampshire",
    "New Jersey", "New Mexico", "Nevada", "New York", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", 
    "South Dakota", "Tennessee", "Texas", "Utah", "Virginia", "Vermont", "Washington", "Wisconsin", "West Virginia", "Wyoming"
  ];

  const filteredStates = States.filter(state => state.toLowerCase().startsWith(State.toLowerCase()));
  const stateList = filteredStates.map((state, i) => 
    <div className='list-item' key={i} value={filteredStates[i] || `${state}`}  
      onClick={(e) => dispatch({type: 'US_STATE', payload: filteredStates[i]})/
        setShowStates(false)}>
    {state}
    </div>
  );

  return(
    <div className='Edit-Section'>
      <InputGroup className='mb-3'>
        <FormControl value={WaterName} onChange={e => dispatch({type: 'WATER_NAME', payload: e.target.value})}/>
        <DropdownButton as={InputGroup.Append} variant="outline-secondary" 
          title={WaterType} id="input-group-dropdown-2"
        >
          <Dropdown.Item onClick={() => dispatch({type: 'WATER_TYPE', payload: 'River'})}>River</Dropdown.Item>
          <Dropdown.Item onClick={() => dispatch({type: 'WATER_TYPE', payload: 'Creek'})}>Creek</Dropdown.Item>
          <Dropdown.Item onClick={() => dispatch({type: 'WATER_TYPE', payload: 'Reservoir'})}>Reservoir</Dropdown.Item>
          <Dropdown.Item onClick={() => dispatch({type: 'WATER_TYPE', payload: 'Lake'})}>Lake</Dropdown.Item>
          <Dropdown.Item onClick={() => dispatch({type: 'WATER_TYPE', payload: 'Pond'})}>Pond</Dropdown.Item>
        </DropdownButton>
      </InputGroup>
      <input placeholder={State}  
        onClick={() => dispatch({type: 'US_STATE'})/setShowStates(true)}
        onChange={e => dispatch({type: 'US_STATE', payload: e.target.value})} 
      />
      {showStates && <Scroll className='list'>{stateList}</Scroll>}
    </div>
  )
};

export default EditLocation;