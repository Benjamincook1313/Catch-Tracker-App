import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ToggleButton, ToggleButtonGroup, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import Scroll from 'react-scrollbar';
import Swal from 'sweetalert2';
import './Catch.css'

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
  const User = useSelector(state => state.user)
  const Day = useSelector(state => state.day);
  const TOD = useSelector(state => state.tod);
  const State = useSelector(state => state.usState);
  const WaterType = useSelector(state => state.waterType);
  const WaterName = useSelector(state => state.waterName);

  const stateList = States.map((state, i) => (
    <Dropdown.Item className='list-item' key={i} value={state}  
    onClick={() => dispatch({type: 'US_STATE', payload: state})}>
      {state}
    </Dropdown.Item>
  ));

  const todList = tod.map((item, i) => (
    <Dropdown.Item className='list-item' key={i} value={tod}  
      onClick={(e) => dispatch({type: 'TOD', payload: tod[i].split(' ').shift()})}>
      {item}
    </Dropdown.Item>)
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
        return `${month} ${day}, ${year}`
    }
  };

  const handleNext=()=>{
    if(WaterName){ 
      dispatch({type: 'NEXT'})
    }else{
      Swal.fire({
        type: 'warning',
        title: `Enter name of ${WaterType.toLowerCase()} before continuing`, 
        showConfirmButton: false,  timer: 4000,
        toast: true, position: 'top'
      })
    }
  };
  
  return(
    <div className='Location'>
      <h2>Location</h2>
      <h4 className='preview'>
        {(WaterType && WaterName) && `${WaterName} ${WaterType }, ${State || User.state}`}
      </h4>
      <InputGroup className='date-time'>
        <FormControl 
          type="date" 
          value={dateConvertor(Day)} 
          onChange={(e) => dispatch({type: 'DAY', payload: reverseDate(e.target.value)})}/>
        <FormControl 
          type='text' 
          value={TOD} 
          placeholder='time of day' 
          onClick={() => dispatch({type: 'TOD'})}
          onChange={e => dispatch({type: 'TOD', payload: e.target.value})} 
        />
      <DropdownButton variant='outline-secondary' title='' as={InputGroup.Append} alignRight>
        {todList}
      </DropdownButton>
      </InputGroup>
      <ToggleButtonGroup className='ButtonGroup' type='radio' name='water' defaultValue='1'>
        <ToggleButton variant='outline-secondary' value="1" 
          onClick={() => dispatch({type: 'WATER_TYPE', payload: 'river'})}>
          <div className='location-btn'>River</div>
        </ToggleButton>
        <ToggleButton variant='outline-secondary' value="2" 
          onClick={() => dispatch({type: 'WATER_TYPE', payload: 'creek'})}>
          <div className='location-btn'>Creek</div>
        </ToggleButton>
        <ToggleButton variant='outline-secondary' value="3" 
          onClick={() => dispatch({type: 'WATER_TYPE', payload: 'lake'})}>
          <div className='location-btn'>Lake</div>
        </ToggleButton>
        <ToggleButton variant='outline-secondary' value="4" 
          onClick={() => dispatch({type: 'WATER_TYPE', payload: 'reservoir'})}>
          <div className='location-btn'>Reservoir</div>
        </ToggleButton>
        <ToggleButton variant='outline-secondary' value="5" 
          onClick={() => dispatch({type: 'WATER_TYPE', payload: 'pond'})}>
          <div className='location-btn'>Pond</div>
        </ToggleButton>
      </ToggleButtonGroup>
      <FormControl 
        value={WaterName} 
        type='text' 
        placeholder={`${WaterType.toLowerCase()} name`}
        onChange={(e) => dispatch({type: 'WATER_NAME', payload: e.target.value})}
      />
      <InputGroup className='state'>
        <FormControl 
          value={State} 
          style={{background: 'white'}}
          readOnly
        />
        <DropdownButton variant='outline-secondary' as={InputGroup.Append} title='' alignRight>
          <Scroll className='list ' stopScrollPropagation={true}>
            {stateList}
          </Scroll>
        </DropdownButton>
      </InputGroup>
      <Button className='page-nav' variant='dark' onClick={handleNext}>
        {'Next >'}
      </Button>
    </div>
  )
};

export default Location;