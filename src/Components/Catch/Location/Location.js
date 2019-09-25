import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Button, ToggleButton, ToggleButtonGroup} from 'react-bootstrap';
import Scroll from 'react-scrollbar';
import Swal from 'sweetalert2';
import './Location.css'

function Location(){
  const tod = [
    'early (before 7am)', 'morning (7-11am)', 'noon (11am-1pm)',
    'midday (1-4pm)', 'evening (4-7pm)', 'night (after 7pm)'
  ];
  const States = [
    "Alaska", "Alabama", "Arkansas", "Arizona", "California", "Colorado", "Connecticut", "Delaware", "Florida","Georgia",
    "Hawaii", "Iowa", "Idaho", "Illinois", "Indiana", "Kansas","Kentucky","Louisiana","Massachusetts","Maryland","Maine", 
    "Michigan", "Minnesota","Missouri", "Mississippi","Montana","North Carolina"," North Dakota","Nebraska","New Hampshire",
    "New Jersey", "New Mexico", "Nevada", "New York", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", 
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

  const filteredStates = States.filter(state => state.toLowerCase().startsWith(State.toLowerCase()));
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
      onClick={(e) => dispatch({type: 'TOD', payload: tod[i].split(' ').shift()})/setShowTOD(false)}>
      {item}
    </div>)
  );

// changes date format to yyyy-mm-dd
  function dateConvertor(date){
    let arr = date.split(' ')
    let year = arr.pop()
    let month = arr.shift()
    let day = arr.toString().split(',').shift()
    switch(month){
      case 'Jan': month = '01'
        break;
      case 'Feb': month = '02'
        break;
      case 'Mar': month = '03'
        break;
      case 'Apr': month = '04'
        break;
      case 'May': month = '05'
        break;
      case 'June': month = '06'
        break;
      case 'July': month = '07'
        break;
      case 'Aug': month = '08'
        break;
      case 'Sept': month = '09'
        break;
      case 'Oct': month = '10'
        break;
      case 'Nov': month = '11'
        break;
      case 'Dec': month = '12'
        break;
      default: 
    }
    return `${year}-${month}-${day<10? `${0+day}`: `${day}`}`
  }

// changes date format to MMM-dd-yyyy
  function reverseDate(date){
    let arr = date.split('-')
    let year = arr.shift()
    let day = arr.pop('')
    let month = arr.shift()
    switch(month){
      case '01': month = `Jan`
        break;
      case '02': month = `Feb`
        break;
      case '03': month = `Mar`
        break;
      case '04': month = `Apr`
        break;
      case '05': month = `May`
        break;
      case '06': month = `June`
         break;
      case '07': month = `July`
        break;
      case '08': month = `Aug` 
        break;
      case '09': month = `Sept` 
        break;
      case '10': month = `Oct` 
        break;
      case '11': month = `Nov` 
        break;
      case '12': month = `Dec`
        break;
      default: 
    }
    return `${month} ${day}, ${year}`
  }

  const infoChecker = () => {
    if(State && !WaterType && WaterName){return 'water type'}
    if(State && WaterType && !WaterName){return 'water name'}
    if(!State && WaterType && WaterName){return 'state'}
    if(!State && !WaterType && WaterName){return 'water type & state'}
    if(!State && WaterType && !WaterName){return 'water name & state'}
    if(State && !WaterType && !WaterName){return 'water type & water name'}
    else{return 'state, water type & water name'}
  };
  
  return(
    <div className='Location' >
      <h2>Where was your catch?</h2>
      <h4 className='preview'>{(WaterType && WaterName) && `${WaterName} ${WaterType}, ${State}`}</h4>
      <div>
        <div>
          <input type="date" value={dateConvertor(Day)} onChange={(e) => dispatch({type: 'DAY', payload: reverseDate(e.target.value)})}/> {' '}
          <input type='text' value={TOD} placeholder='time of day' 
            onClick={() => setShowTOD(true)} onChange={e => dispatch({type: 'TOD', payload: e.target.value})} 
          />
          {showTOD && <button className='btn' onClick={() => setShowTOD(false)}>X</button>}
          {showTOD && todList}
        </div>
        <div>
          <input className='water-name' value={WaterName} type='text' placeholder={`name of`}
            onChange={(e) => dispatch({type: 'WATER_NAME', payload: e.target.value})}
          />
        </div>
        <ToggleButtonGroup className='ButtonGroup' type='radio' name='water' defaultValue='1'>
          <ToggleButton variant='outline-secondary' value="1"
            onClick={() => dispatch({type: 'WATER_TYPE', payload: 'River'})}>
            <div className='location-btn'>River</div>
          </ToggleButton>
          <ToggleButton variant='outline-secondary' value="2"
            onClick={() => dispatch({type: 'WATER_TYPE', payload: 'Creek'})}>
            <div className='location-btn'>Creek</div>
          </ToggleButton>
          <ToggleButton variant='outline-secondary' value="3"
            onClick={() => dispatch({type: 'WATER_TYPE', payload: 'Lake'})}>
            <div className='location-btn'>Lake</div>
          </ToggleButton>
          <ToggleButton variant='outline-secondary' value="4"
            onClick={() => dispatch({type: 'WATER_TYPE', payload: 'Reservoir'})}>
            <div className='location-btn'>Reservoir</div>
          </ToggleButton>
          <ToggleButton variant='outline-secondary' value="5"
            onClick={() => dispatch({type: 'WATER_TYPE', payload: 'Pond'})}>
            <div className='location-btn'>Pond</div>
          </ToggleButton>
        </ToggleButtonGroup>
        <div>
          <input className='state' value={State} type='text'
            onClick={() => setShowStates(true)/dispatch({type: 'US_STATE', payload: ''})} 
            onKeyPress={() => setShowStates(true)}
            onChange={e => dispatch({type: 'US_STATE', payload: e.target.value})}
          />
          {showStates && 
            <Scroll className='list '>
              {stateList}
            </Scroll>
          }
        </div>
      </div>
      <br/>
      <Button className='page-nav' variant='dark'
        onClick={() => (State && WaterType && WaterName)? dispatch({type: 'NEXT'}): 
        Swal.fire({
          title:`Enter ${infoChecker()} before continuing`, 
          showConfirmButton: false, 
          type: 'warning', timer: 4000}
        )}>
        {'Next >'}
      </Button>
    </div>
  )
};

export default Location;