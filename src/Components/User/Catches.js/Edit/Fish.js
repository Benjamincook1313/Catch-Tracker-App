import React, { useState,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormControl, InputGroup, Dropdown, DropdownButton, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import ImageUploader from '../../../Catch/Fish/ImageUpload';
import Scroll from 'react-scrollbar';

function EditFish(props){
  const { Image } = props
  const dispatch = useDispatch();
  const image = useSelector(state => state.image)
  const Species = useSelector(state => state.species)
  const Length = useSelector(state => state.length)
  const fishType = useSelector(state => state.fishType)
  const [Type, setType] = useState(fishType.toLowerCase())
  const [showOther, setShowOther] = useState(false)

  const trout = ['Apache', 'Bull', 'Brook','Brown', 'Cutthroat', 'DollyVarden','Golden', 'Lake', 'Rainbow', 'Splake', 'Tiger'];
  const salmon = ['Atlantic', 'Chinook (King)', 'Coho (Silver)', 'Humpy (Pink)', 'Keta (Chum)',  'Kokanee', 'Sockeye (Red)', 'Steelhead (Rainbow)'];
  const bass = ['Large-Mouth', 'Small-Mouth', 'Striper', 'White'];
  const other = ['Alligator-Gar', 'Bluegill', 'Crappie', 'Catfish', 'Grayling', 'Herring', 'Muskie', 'Pike', 'Perch', 'Shad','Sturgeon', 'Sucker', 'Walleye'];
  const inches = ['6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', 
    '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', 
    '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', 
    '68', '69', '70'
  ];

  const speciesList = eval(Type).map((species, i) => (
    <Dropdown.Item key={i} value={Type[i] || Species} 
    onClick={() => dispatch({type: 'SPECIES', payload: `${Type[i].split(' ').shift()}`})/
    setShowOther(false)}>
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
          <ToggleButton variant='outline-secondary' value='Trout' onClick={() => setType(trout)/
            dispatch({type: 'SPECIES'})/dispatch({type: 'FISH_TYPE', payload: 'Trout'})/setShowOther(false)}>
          <div className='type-btn'>Trout</div>
          </ToggleButton>
          <ToggleButton variant='outline-secondary' value="Salmon" onClick={() => setType(salmon)/
              dispatch({type: 'SPECIES'})/dispatch({type: 'FISH_TYPE', payload: 'Salmon'})/setShowOther(false)}>
            <div className='type-btn'>Salmon</div>
          </ToggleButton>
          <ToggleButton variant='outline-secondary' value="Bass" onClick={() => setType(bass)/
              dispatch({type: 'SPECIES'})/dispatch({type: 'FISH_TYPE', payload: 'Bass'}) /setShowOther(false)}>
            <div className='type-btn'>Bass</div>
          </ToggleButton>
          <ToggleButton variant='outline-secondary' value="Other" onClick={() => setType(other)/
              dispatch({type: 'SPECIES'})/dispatch({type: 'FISH_TYPE', payload: 'Other'})/
              setShowOther(true)}>
            <div className='type-btn'>Other</div>
          </ToggleButton>
        </ToggleButtonGroup>
        <InputGroup className='inputGroup input'>
          <DropdownButton as={InputGroup.Prepend} variant="outline-secondary" title={Species || 'Species'}>
            <Scroll style={{maxHeight: 200}}>
              {speciesList}
              {(fishType === 'Other')&&
                <FormControl className='input' style={{marginRight: 20}} placeholder='enter fish species' onChange={e => dispatch({type: 'Species', payload: e.target.value})}/>
              }  
            </Scroll>
          </DropdownButton>
          <DropdownButton as={InputGroup.Append} variant="outline-secondary" title={Length}>
            <Scroll style={{maxHeight: 200, textAlign: 'center'}}>{inchList}</Scroll>
          </DropdownButton >
        </InputGroup>
        {image? 
          <div className='edit-img'>(new image)
            <button className='x' onClick={() => dispatch({type: 'IMAGE'})}>x</button>
          </div>:'(current image)'
        }
        <img src={image || props.Image} alt='' width={200}/>
        <ImageUploader />
      </Scroll>
    </div>
  )
};
export default EditFish;