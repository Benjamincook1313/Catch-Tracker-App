import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Scroll from 'react-scrollbar';

function editLocation(){
  const [showTOD, setShowTOD] = useState(false)
  const [showStates, setShowStates] = useState(false)
  
  const dispatch = useDispatch()
  const Date = useSelector(state => state.day)
  const Tod = useSelector(state => state.tod)
  const WaterType = useSelector(state => state.waterType)
  const WaterName = useSelector(state => state.waterType)
  const State = useSelector(state => state.usState)

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
  const tod = [
    'early (before 7am)', 'morning (7-11am)', 'noon (11am-1pm)',
    'midday (1-4pm)', 'evening (4-7pm)', 'night (after 7pm)'
  ];
  const todList = tod.map((item, i) => (
    <div className='list-item' key={i} value={tod[i] || tod}  
      onClick={(e) => dispatch({type: 'TOD', payload: tod[i].split(' ').shift()})/setShowTOD(false)}>
      {item}
    </div>)
  );

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
    <div className='editLocation'>
      <input type='date' value={dateConvertor(Date)}/>
        <input placeholder={Tod} onClick={() => setShowTOD(true)} readOnly/>
        {showTOD && todList}
        <input value={WaterType} />
        <input placeholder={State}  
          onClick={() => dispatch({type: 'US_STATE', payload: ''})}
          onChange={e => dispatch({type: 'US_STATE', payload: e.target.value})} 
          onClick={() => setShowStates(true)} />
        {showStates && <Scroll>{stateList}</Scroll>}
    </div>
  )
};

export default editLocation;