import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Button } from 'react-bootstrap';
import ImageUpload from './ImageUpload'; 
import '../Catch.css'

function Fish(){
  const dispatch = useDispatch();

  const FishType = useSelector(state => state.fishType);
  const Species = useSelector(state => state.species);
  const Length = useSelector(state => state.length);
  
  const [Type, setType] = useState([]);
  const [showSpecies, setShowSpecies] = useState(false);
  const [showInches, setShowInches] = useState(false)

  const trout = ['Apache', 'Bull', 'Brook','Brown', 'Cutthroat', 'DollyVarden','Golden', 'Lake', 'Rainbow', 'Splake', 'Tiger'];
  const salmon = ['Atlantic', 'Chinook (King)', 'Coho (Silver)', 'Humpy (Pink)', 'Keta (Chum)',  'Kokanee', 'Sockeye (Red)', 
    'Steelhead (Rainbow)'];
  const bass = ['Large-Mouth', 'Small-Mouth', 'Striper', 'White'];
  const other = ['Alligator-Gar', 'Bluegill', 'Crappie', 'Catfish', 'Grayling', 'Herring', 'Muskie', 'Pike', 'Perch', 
    'Shad','Sturgeon', 'Sucker', 'Walleye'];
  const inches = ['6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', 
    '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', 
    '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', 
    '68', '69', '70'
  ];

  const filtered = Type.filter(species => species === '' || species.toLowerCase().startsWith(Species))
  const speciesList = filtered.map((species, i) => (
  <div className='list-item' key={i} value={Type[i] || Species} 
    onClick={() => dispatch({type: 'SPECIES', payload: `${filtered[i].split(' ').shift()}`})/setShowSpecies(false)}>
    {species}
  </div>));

  const inchList = inches.map((inch, i) => (
    <div className='list-item' key={i} onClick={() => dispatch({type: 'LENGTH', payload: inches[i]})/setShowInches(false)} >
      {inch}
    </div>  
  ))

  return(
    <div className='Fish'>
      <h2>What kind of Fish?</h2>
      {Species && <h4 className='fish-info'>{`${Length? Length+'"': ''} ${Species} ${FishType}`} </h4>}
      <div className="btn-group btn-group-toggle" data-toggle="buttons">
        <label className="btn btn-secondary" onClick={() => setType(trout)/
          setShowSpecies(true)/
          dispatch({type: 'SPECIES'})/
          dispatch({type: 'FISH_TYPE', payload: 'Trout'})}>
          <input type="radio" name="options" id="option1" /> Trout
        </label>
        <label className="btn btn-secondary" 
          onClick={() => setType(salmon)/
          setShowSpecies(true)/
          dispatch({type: 'SPECIES'})/
          dispatch({type: 'FISH_TYPE', payload: 'Salmon'})}>
          <input type="radio" name="options" id="option2" /> Salmon
        </label>
        <label className="btn btn-secondary" 
          onClick={() => setType(bass)/
            setShowSpecies(true)/
            dispatch({type: 'SPECIES'})/
            dispatch({type: 'FISH_TYPE', payload: 'Bass'})}>
          <input type="radio" name="options" id="option3" /> Bass
        </label>
        <label className="btn btn-secondary" 
          onClick={() => setType(other)/
            setShowSpecies(true)/
            dispatch({type: 'SPECIES'})/
            dispatch({type: 'FISH_TYPE', payload: 'Other'})}>
          <input type="radio" name="options" id="option4" /> Other
        </label>
      </div>
      <div className='fish-inputs'>
        <div>
          <input 
            value={Species}
            placeholder={'Species'}
            onClick={() => setShowSpecies(true)}
            onChange={e => dispatch({type: 'SPECIES', payload: e.target.value})}
          /> {FishType}
        </div>
        {showSpecies && <div className='list'> {speciesList}</div>}
        <input type='text' placeholder='length' value={Length} onClick={() => setShowInches(true)} readOnly/>
        {showInches && <div className='list'>{inchList}</div> }
      </div>
      <div>
        <ImageUpload />
      </div>
      <br/>
      <div>
        <input className='btn btn-dark' type='button' value={'< Back'} onClick={() => dispatch({type: 'BACK'})}/>
        {(Type && Species) && <input className='btn btn-dark' type='button' value={'Next >'} onClick={() => dispatch({type: 'NEXT'})}/> }
      </div>
    </div>
  )
};

export default Fish;