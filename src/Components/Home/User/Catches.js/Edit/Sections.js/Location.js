import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InputGroup, FormControl, DropdownButton, Dropdown} from 'react-bootstrap';
import Scroll from 'react-scrollbar';

function EditLocation(){
  const dispatch = useDispatch()

  const WaterName = useSelector(state => state.waterName)
  const WaterType = useSelector(state => state.waterType)
  const UsState = useSelector(state => state.usState)

  const States = [
    "Alaska", "Alabama", "Arkansas", "Arizona", "California", "Colorado", "Connecticut", "Delaware", "Florida","Georgia",
    "Hawaii", "Iowa", "Idaho", "Illinois", "Indiana", "Kansas","Kentucky","Louisiana","Massachusetts","Maryland","Maine", 
    "Michigan", "Minnesota","Missouri", "Mississippi","Montana","North Carolina"," North Dakota","Nebraska","New Hampshire",
    "New Jersey", "New Mexico", "Nevada", "New York", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", 
    "South Dakota", "Tennessee", "Texas", "Utah", "Virginia", "Vermont", "Washington", "Wisconsin", "West Virginia", "Wyoming"
  ];

  // const filteredStates = States.filter(state => state.toLowerCase().startsWith(State.toLowerCase()));
  const stateList = States.map((state, i) => 
    <Dropdown.Item className='list-item' key={i} value={state}  
      onClick={(e) => dispatch({type: 'US_STATE', payload: state})}>
    {state}
    </Dropdown.Item>
  );

  return(
    <div className='Edit-Section'>
      <InputGroup className='mb-3'>
        <FormControl value={WaterName} onChange={e => dispatch({type: 'WATER_NAME', payload: e.target.value})}/>
        <DropdownButton as={InputGroup.Append} variant="outline-secondary" title={WaterType} id="input-group-dropdown-2">
          <Dropdown.Item onClick={() => dispatch({type: 'WATER_TYPE', payload: 'River'})}>River</Dropdown.Item>
          <Dropdown.Item onClick={() => dispatch({type: 'WATER_TYPE', payload: 'Creek'})}>Creek</Dropdown.Item>
          <Dropdown.Item onClick={() => dispatch({type: 'WATER_TYPE', payload: 'Reservoir'})}>Reservoir</Dropdown.Item>
          <Dropdown.Item onClick={() => dispatch({type: 'WATER_TYPE', payload: 'Lake'})}>Lake</Dropdown.Item>
          <Dropdown.Item onClick={() => dispatch({type: 'WATER_TYPE', payload: 'Pond'})}>Pond</Dropdown.Item>
        </DropdownButton>
      </InputGroup>
      <InputGroup>
      <FormControl 
        value={UsState}  
        style={{background: 'white'}}
        readOnly
      />
        <DropdownButton variant='outline-secondary' title='' as={InputGroup.Append} alignRight>
          <Scroll className='list'>{stateList}</Scroll>
        </DropdownButton>
      </InputGroup>
    </div>
  )
};

export default EditLocation;