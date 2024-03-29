import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormControl, InputGroup, DropdownButton, Dropdown } from 'react-bootstrap';

function DateTime(){
  const dispatch = useDispatch()
  const Date = useSelector(state => state.day)
  const Tod = useSelector(state => state.tod)

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
      <Dropdown.Item  key={i}   
        onClick={(e) => dispatch({type: 'TOD', payload: item.split(' ').shift()})}>
        {item}
      </Dropdown.Item>)
    );

  return(
    <div className='Edit-Section'>
      <FormControl type='date' value={dateConvertor(Date)} onChange={e => dispatch({type: 'DAY', payload: reverseDate(e.target.value)})}/>
      <InputGroup className='inputGroup input'>
        <FormControl placeholder='specify time' type='time' onChange={e => dispatch({type: 'TOD', payload: e.target.value})}/>
        <p className='or'>or</p>
        <DropdownButton as={InputGroup.Append} variant="outline-secondary" title={Tod} id="input-group-dropdown-2" alignRight>
          {todList}
        </DropdownButton>
      </InputGroup>
    </div>
  )
};

export default DateTime;