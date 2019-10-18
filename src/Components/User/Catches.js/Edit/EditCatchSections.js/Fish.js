import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { InputGroup, Dropdown, DropdownButton, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import ImageUploader from '../../../../ImageUpload';
import Fish from '../../../../../Images/fish.png'
import Scroll from 'react-scrollbar';

function EditFish(props){
  const dispatch = useDispatch();
  const image = useSelector(state => state.image)
  const Species = useSelector(state => state.species)
  const Length = useSelector(state => state.length)
  const fishType = useSelector(state => state.fishType)
  const [refresh, setRefresh] = useState(false)

  const types = {
    'trout': ['Apache', 'Bull', 'Brook','Brown', 'Cutthroat', 'DollyVarden','Golden', 'Lake', 'Rainbow', 'Splake', 'Steelhead', 'Tiger'],
    'salmon': ['Atlantic', 'Chinook (King)', 'Coho (Silver)', 'Humpy (Pink)', 'Keta (Chum)',  'Kokanee', 'Sockeye (Red)'],
    'bass': ['Large-Mouth', 'Small-Mouth', 'Striper', 'White'],
    'other': ['Alligator-Gar', 'Bluegill', 'Crappie', 'Catfish', 'Grayling', 'Herring', 'Muskie', 'Pike', 'Perch', 'Shad','Sturgeon', 'Sucker', 'Walleye'],
  }
  const inches = ['6"', '7"', '8"', '9"', '10"', '11"', '12"', '13"', '14"', '15"', '16"', '17"', '18"', '19"', '20"', '21"', '22"', '23"', '24"', '25"', 
   '26"', '27"', '28"', '29"', '30"', '31"', '32"', '33"', '34"', '35"', '36"', '37"', '38"', '39"', '40"', '41"', '42"', '43"', '44"', '45"', '46"', 
   '47"', '48"', '49"', '50"', '51"', '52"', '53"', '54"', '55"', '56"', '57"', '58"', '59"', '60"', '61"', '62"', '63"', '64"', '65"', '66"', '67"', 
   '68"', '69"', '70"'
 ];

  const speciesList = types[fishType].map((species, i) => (
    <Dropdown.Item className='list-item fishItem' key={i} value={species}
    onClick={() => dispatch({type: 'SPECIES', payload: types[fishType][i]})}>
      {species}
    </Dropdown.Item>));

  const inchList = inches.map((inch, i) => (
    <Dropdown.Item  key={i} onClick={() => dispatch({type: 'LENGTH', payload: inch})}>
        {inch}
      </Dropdown.Item>  
    ))
  return(
    <div className='Edit-fish' style={{height: 300}}>
      <Scroll stopScrollPropagation={true} style={{padding: '20px'}}>
        <h4 className='input'>{Length} {Species} {fishType}</h4>
        <ToggleButtonGroup  type='radio' name='fishType' defaultValue={fishType}>
          <DropdownButton variant={fishType === 'trout'? 'secondary': 'outline-secondary'} value="trout" title='Trout' 
            onClick={() => dispatch({type: 'FISH_TYPE', payload: 'trout'})}>
              <Scroll className='list' stopScrollPropagation={true}>{speciesList}</Scroll>
          </DropdownButton>
          <DropdownButton variant={fishType === 'salmon'? 'secondary': 'outline-secondary'} value="salmon" title='Salmon' 
            onClick={() => dispatch({type: 'FISH_TYPE', payload: 'salmon'})}>
              <Scroll className='list' stopScrollPropagation={true}>{speciesList}</Scroll>
          </DropdownButton>
          <DropdownButton variant={fishType === 'bass'? 'secondary': 'outline-secondary'} value="bass" title='Bass' alignRight 
            onClick={() => dispatch({type: 'FISH_TYPE', payload: 'bass'})}>
              <Scroll className='list' stopScrollPropagation={true}>{speciesList}</Scroll>
          </DropdownButton>
          <DropdownButton variant={fishType === 'other'? 'secondary': 'outline-secondary'} value="other" title='Other' alignRight
            onClick={() => dispatch({type: 'FISH_TYPE', payload: 'other'})}>
              <Scroll className='list' stopScrollPropagation={true}>{speciesList}</Scroll>
          </DropdownButton>
        </ToggleButtonGroup>
        <InputGroup className='inputGroup input'>
          <DropdownButton variant="outline-secondary" title={Length} alignRight>
            <Scroll style={{maxHeight: 200, textAlign: 'center'}}>{inchList}</Scroll>
          </DropdownButton >
        </InputGroup>
        <img src={image} alt='' width={200} />
        <ImageUploader />
      </Scroll>
    </div>
  )
};
export default EditFish;