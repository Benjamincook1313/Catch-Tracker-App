import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToggleButtonGroup, Button, FormControl, Dropdown, DropdownButton, InputGroup } from 'react-bootstrap';
import ImageUpload from './ImageUpload'; 
import Scroll from 'react-scrollbar';
import './Fish.css'

function Fish(){
  const dispatch = useDispatch();

  const FishType = useSelector(state => state.fishType);
  const Species = useSelector(state => state.species);
  const Length = useSelector(state => state.length);
  const Image = useSelector(state => state.image)
  
  const [Type, setType] = useState('trout');
  const [showOther, setShowOther] = useState(false);

  const types = {
    'trout': ['Apache', 'Bull', 'Brook','Brown', 'Cutthroat', 'DollyVarden','Golden', 'Lake', 'Rainbow', 'Splake', 'Tiger'],
    'salmon': ['Atlantic', 'Chinook (King)', 'Coho (Silver)', 'Humpy (Pink)', 'Keta (Chum)',  'Kokanee', 'Sockeye (Red)', 'Steelhead (Rainbow)'],
    'bass': ['Large-Mouth', 'Small-Mouth', 'Striper', 'White'],
    'other': ['Alligator-Gar', 'Bluegill', 'Crappie', 'Catfish', 'Grayling', 'Herring', 'Muskie', 'Pike', 'Perch', 'Shad','Sturgeon', 'Sucker', 'Walleye']
  }
  const inches = ['6"', '7"', '8"', '9"', '10"', '11"', '12"', '13"', '14"', '15"', '16"', '17"', '18"', '19"', '20"', '21"', '22"', '23"', '24"', '25"', 
   '26"', '27"', '28"', '29"', '30"', '31"', '32"', '33"', '34"', '35"', '36"', '37"', '38"', '39"', '40"', '41"', '42"', '43"', '44"', '45"', '46"', 
   '47"', '48"', '49"', '50"', '51"', '52"', '53"', '54"', '55"', '56"', '57"', '58"', '59"', '60"', '61"', '62"', '63"', '64"', '65"', '66"', '67"', 
   '68"', '69"', '70"'
 ];

  const filtered = types[Type].filter(species => species === '' || species.toLowerCase().startsWith(Species))
  const speciesList = filtered.map((species, i) => (
  <Dropdown.Item className='list-item fishItem' key={i} value={species[i] || Species} 
    onClick={() => dispatch({type: 'SPECIES', payload: `${filtered[i].split(' ').shift()}`})/
    setShowOther(false)}>
    {species}
  </Dropdown.Item>));

  const inchList = inches.map((inch, i) => (
    <Dropdown.Item className='list-item fishItem' key={i} 
      onClick={() => dispatch({type: 'LENGTH', payload: inches[i]})} >
      {inch}
    </Dropdown.Item>  
  ))

  return(
    <div className='Fish'>
      <h2>What kind of Fish?</h2>
      {Species && <h4 className='preview'>{`${Length? Length: ''} ${Species} ${(FishType !== 'other')? FishType: ''}`} </h4>}
      <ToggleButtonGroup className='ButtonGroup' type='radio' name='fishType'  >
        <DropdownButton variant='outline-secondary' value="1" title='Trout' 
          onClick={() => setType('trout')/
          dispatch({type: 'SPECIES'})/
          dispatch({type: 'FISH_TYPE', payload: 'trout'})/
          setShowOther(false)}>
            {speciesList}
        </DropdownButton>
        <DropdownButton variant='outline-secondary' value="2" title='Salmon' 
          onClick={() => setType('salmon')/
          dispatch({type: 'SPECIES'})/
          dispatch({type: 'FISH_TYPE', payload: 'salmon'})/
          setShowOther(false)}>
            {speciesList}
        </DropdownButton>
        <DropdownButton variant='outline-secondary' value="3" title='Bass' alignRight 
          onClick={() => setType('bass')/
          dispatch({type: 'SPECIES'})/
          dispatch({type: 'FISH_TYPE', payload: 'bass'})/
          setShowOther(false)}>
            {speciesList}
        </DropdownButton>
        <DropdownButton variant='outline-secondary' value="5" title='Other' alignRight
          onClick={() => setType('other')/
          dispatch({type: 'SPECIES'})/
          dispatch({type: 'FISH_TYPE', payload: 'other'})/
          setShowOther(true)}>
            {speciesList}
        </DropdownButton>
      </ToggleButtonGroup>
      {showOther && 
        <FormControl className='input' value={Species} placeholder='enter species' 
        onChange={e => dispatch({type: 'SPECIES', payload: e.target.value})}/>
      }
      <InputGroup className='input' style={{width: '160px', margin: 'auto'}} >
        <FormControl type='text' placeholder='length' value={Length} readOnly style={{background: 'white'}}/>
        <DropdownButton variant='outline-dark' as={InputGroup.Append} title='' alignRight>
          <Scroll className='list'>{inchList}</Scroll>
        </DropdownButton>
      </InputGroup>
      <div>
        <img src={Image} alt='' width={200}/>
        <ImageUpload />
      </div>
      <br/>
      <div>
        <Button className='page-nav' variant='dark' onClick={() => dispatch({type: 'BACK'})}>
          {'< Back'}
        </Button>
        <Button className='page-nav' variant='dark' onClick={() => dispatch({type: 'NEXT'})}>
          {'Next >'}
        </Button>
      </div>
    </div>
  )
};

export default Fish;