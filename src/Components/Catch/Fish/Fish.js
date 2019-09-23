import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToggleButton, ToggleButtonGroup, Button } from 'react-bootstrap';
import ImageUpload from './ImageUpload'; 
import Scroll from 'react-scrollbar';
import './Fish.css'

function Fish(){
  const dispatch = useDispatch();

  const FishType = useSelector(state => state.fishType);
  const Species = useSelector(state => state.species);
  const Length = useSelector(state => state.length);
  
  const [Type, setType] = useState([]);
  const [showSpecies, setShowSpecies] = useState(false);
  const [showInches, setShowInches] = useState(false);
  const [showOther, setShowOther] = useState(false);

  const trout = ['Apache', 'Bull', 'Brook','Brown', 'Cutthroat', 'DollyVarden','Golden', 'Lake', 'Rainbow', 
  'Splake', 'Tiger'];
  const salmon = ['Atlantic', 'Chinook (King)', 'Coho (Silver)', 'Humpy (Pink)', 'Keta (Chum)',  
    'Kokanee', 'Sockeye (Red)', 'Steelhead (Rainbow)'];
  const bass = ['Large-Mouth', 'Small-Mouth', 'Striper', 'White'];
  const other = ['Alligator-Gar', 'Bluegill', 'Crappie', 'Catfish', 'Grayling', 'Herring', 
    'Muskie', 'Pike', 'Perch', 'Shad','Sturgeon', 'Sucker', 'Walleye'];
  const inches = ['6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', 
    '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', 
    '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', 
    '68', '69', '70'
  ];

  const filtered = Type.filter(species => species === '' || species.toLowerCase().startsWith(Species))
  const speciesList = filtered.map((species, i) => (
  <div className='list-item fishItem' key={i} value={Type[i] || Species} 
    onClick={() => dispatch({type: 'SPECIES', payload: `${filtered[i].split(' ').shift()}`})/
    setShowSpecies(false)/setShowOther(false)}>
    {species}
  </div>));

  const inchList = inches.map((inch, i) => (
    <div className='list-item fishItem' key={i} onClick={() => dispatch({type: 'LENGTH', payload: inches[i]})/
      setShowInches(false)} >
    {inch}
    </div>  
  ))

  return(
    <div className='Fish'>
      <h2 className='fish-title'>What kind of Fish?</h2>
      {Species && <h4 className='preview'>{`${Length? Length+'"': ''} ${Species} ${(FishType !== 'Other')? FishType: ' '}`} </h4>}
      <ToggleButtonGroup className='ButtonGroup' type='radio' name='fishType' >
        <ToggleButton variant='outline-secondary' value="1" onClick={() => setType(trout)/
          setShowSpecies(true)/dispatch({type: 'SPECIES'})/
          dispatch({type: 'FISH_TYPE', payload: 'Trout'})/setShowOther(false)}>
        <div className='type-btn'>Trout</div>
        </ToggleButton>
        <ToggleButton variant='outline-secondary' value="2" onClick={() => setType(salmon)/
            setShowSpecies(true)/dispatch({type: 'SPECIES'})/
            dispatch({type: 'FISH_TYPE', payload: 'Salmon'})/setShowOther(false)}>
          <div className='type-btn'>Salmon</div>
        </ToggleButton>
        <ToggleButton variant='outline-secondary' value="3" onClick={() => setType(bass)/
            setShowSpecies(true)/dispatch({type: 'SPECIES'})/
            dispatch({type: 'FISH_TYPE', payload: 'Bass'}) /setShowOther(false)}>
          <div className='type-btn'>Bass</div>
        </ToggleButton>
        <ToggleButton variant='outline-secondary' value="4" onClick={() => setType(other)/
            setShowSpecies(true)/dispatch({type: 'SPECIES'})/
            dispatch({type: 'FISH_TYPE', payload: 'Other'})/
            setShowOther(true)}>
          <div className='type-btn'>Other</div>
        </ToggleButton>
      </ToggleButtonGroup>
      <div>
        {showOther && <input value={Species} placeHolder='species' 
          onChange={e => dispatch({type: 'SPECIES', payload: e.target.value})}
        />}
      </div>
      {showSpecies && <Scroll className='list'> {speciesList}</Scroll>}
      <div className='length'>
        <input type='text' placeholder='length' value={Length} onClick={() => setShowInches(true)} />
        {showInches && <Scroll className='list'>{inchList}</Scroll> }
      </div>
      <div>
        <ImageUpload />
      </div>
      <br/>
      <div>
        <Button variant='dark' onClick={() => dispatch({type: 'BACK'})}>
          {'< Back'}
        </Button>
        <Button variant='dark' onClick={() => dispatch({type: 'NEXT'})}>
          {'Next >'}
        </Button>
      </div>
    </div>
  )
};

export default Fish;