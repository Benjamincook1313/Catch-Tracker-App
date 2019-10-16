import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormControl, InputGroup, Dropdown, DropdownButton, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import ImageUploader from '../../../../ImageUpload';
import Fish from '../../../../../Images/fish.png'
import Scroll from 'react-scrollbar';

function EditFish(props){
  const dispatch = useDispatch();
  const image = useSelector(state => state.image)
  const Species = useSelector(state => state.species)
  const Length = useSelector(state => state.length)
  const fishType = useSelector(state => state.fishType)

  const types = {
    trout: ['Apache', 'Bull', 'Brook','Brown', 'Cutthroat', 'DollyVarden','Golden', 'Lake', 'Rainbow', 'Splake', 'Tiger'],
    salmon: ['Atlantic', 'Chinook (King)', 'Coho (Silver)', 'Humpy (Pink)', 'Keta (Chum)',  'Kokanee', 'Sockeye (Red)', 'Steelhead (Rainbow)'],
    bass: ['Large-Mouth', 'Small-Mouth', 'Striper', 'White'],
    other: ['Alligator-Gar', 'Bluegill', 'Crappie', 'Catfish', 'Grayling', 'Herring', 'Muskie', 'Pike', 'Perch', 'Shad','Sturgeon', 'Sucker', 'Walleye'],
  
  }
  const inches = ['6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', 
    '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', 
    '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', 
    '68', '69', '70'
  ];

  const speciesList = types[fishType].map((species, i) => (
    <Dropdown.Item key={i} value={fishType[i] || Species}
    onClick={() => dispatch({type: 'SPECIES', payload: `${fishType[i].split(' ').shift()}`})}>
      {species}
    </Dropdown.Item>));

  const inchList = inches.map((inch, i) => (
    <Dropdown.Item  key={i} onClick={() => dispatch({type: 'LENGTH', payload: inches[i]})}>
        {inch}
      </Dropdown.Item>  
    ))
  return(
    <div className='Edit-Section' style={{height: 280}}>
      <Scroll>
        <ToggleButtonGroup  type='radio' name='fishType' defaultValue={`${fishType}`}>
          <ToggleButton variant='outline-secondary' value='trout' onClick={() => dispatch({type: 'SPECIES'})/dispatch({type: 'FISH_TYPE', payload: 'trout'})}>
          <div className='type-btn'>Trout</div>
          </ToggleButton>
          <ToggleButton variant='outline-secondary' value="salmon" onClick={() => dispatch({type: 'SPECIES'})/dispatch({type: 'FISH_TYPE', payload: 'salmon'})}>
            <div className='type-btn'>Salmon</div>
          </ToggleButton>
          <ToggleButton variant='outline-secondary' value="bass" onClick={() => dispatch({type: 'SPECIES'})/dispatch({type: 'FISH_TYPE', payload: 'bass'}) }>
            <div className='type-btn'>Bass</div>
          </ToggleButton>
          <ToggleButton variant='outline-secondary' value="other" onClick={() => dispatch({type: 'SPECIES'})/dispatch({type: 'FISH_TYPE', payload: 'other'})}>
            <div className='type-btn'>Other</div>
          </ToggleButton>
        </ToggleButtonGroup>
        <InputGroup className='inputGroup input'>
          <DropdownButton as={InputGroup.Prepend} variant="outline-secondary" title={Species || 'Species'} alignLeft>
            <Scroll style={{maxHeight: 200}}>
              {speciesList}
              {(fishType === 'Other')&&
                <FormControl className='input' style={{marginRight: 20}} placeholder='enter fish species' onChange={e => dispatch({type: 'Species', payload: e.target.value})}/>
              }  
            </Scroll>
          </DropdownButton>
          <DropdownButton as={InputGroup.Append} variant="outline-secondary" title={Length} alignRight>
            <Scroll style={{maxHeight: 200, textAlign: 'center'}}>{inchList}</Scroll>
          </DropdownButton >
        </InputGroup>
        {image? 
          <div className='edit-img'>(new image)
            <button className='x' onClick={() => dispatch({type: 'IMAGE'})}>X</button>
            <img src={image} alt='' width={200} />
          </div>:
          <div>
            <img src={props.Image || Fish} alt='' width={200}/>
          </div>
        }
        <ImageUploader />
      </Scroll>
    </div>
  )
};
export default EditFish;