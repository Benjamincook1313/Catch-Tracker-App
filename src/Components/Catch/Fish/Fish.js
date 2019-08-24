import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ImageUpload from './ImageUpload'; 

function Fish(){
  const dispatch = useDispatch();

  const FishType = useSelector(state => state.fishType);
  const Species = useSelector(state => state.species);
  
  const [Type, setType] = useState([]);
  const [showSpecies, setShowSpecies] = useState(false);

  const trout = ['Apache', 'Bull', 'Brook','Brown', 'Cutthroat', 'Dolly Varden','Golden', 'Lake', 'Rainbow', 'Splake', 'Tiger'];
  const salmon = ['Atlantic', 'Chinook (King)', 'Coho (Silver)', 'Humpy (Pink)', 'Keta (Chum)',  'Kokanee', 'Sockeye (Red)', 'Steelhead (Rainbow)'];
  const bass = ['Large Mouth', 'Small Mouth', 'Striper', 'White'];
  const other = ['Alligator Gar', 'Bluegill', 'Crappie', 'Catfish', 'Grayling', 'Herring', 'Muskie', 'Pike', 'Perch', 'Shad','Sturgeon', 'Sucker', 'Walleye'];

  const filtered = Type.filter(species => species === '' || species.toLowerCase().startsWith(Species))
  const speciesList = filtered.map((species, i) => (
  <div className='list-item' key={i} value={Type[i] || Species} 
    onClick={() => dispatch({type: 'SPECIES', payload: filtered[i]})/setShowSpecies(false)}>
    {species}
  </div>));

  return(
    <div className='Fish'>
      <h2>What kind of Fish?</h2>
      {Species && <h4>{`${Species} ${FishType}`} </h4>}
        <div className="btn-group btn-group-toggle" data-toggle="buttons">
          <label className="btn btn-secondary" onClick={() => setType(trout)/
            setShowSpecies(true)/
            dispatch({type: 'FISH_TYPE', payload: 'Trout'})}>
            <input type="radio" name="options" id="option1" /> Trout
          </label>
          <label className="btn btn-secondary" 
            onClick={() => setType(salmon)/
            setShowSpecies(true)/
            dispatch({type: 'FISH_TYPE', payload: 'Salmon'})}>
            <input type="radio" name="options" id="option2" /> Salmon
          </label>
          <label className="btn btn-secondary" 
            onClick={() => setType(bass)/
              setShowSpecies(true)/
              dispatch({type: 'FISH_TYPE', payload: 'Bass'})}>
            <input type="radio" name="options" id="option3" /> Bass
          </label>
          <label className="btn btn-secondary" 
            onClick={() => setType(other)/
              setShowSpecies(true)/
              dispatch({type: 'FISH_TYPE', payload: 'Other'})}>
            <input type="radio" name="options" id="option4" /> Other
          </label>
        </div>
      <div>
        <input 
          value={Species}
          placeholder={'Species'}
          onClick={() => setShowSpecies(true)}
          onChange={e => dispatch({type: 'SPECIES', payload: e.target.value})}
          // required
        /> {FishType}
        <div className='list'>{showSpecies && speciesList}</div>
      </div>
      <ImageUpload />
      <div>
        <button onClick={() => dispatch({type: 'BACK'})}>Back</button>
        {(Type && Species) && <button onClick={() => dispatch({type: 'NEXT'})}>Next</button> }
      </div>
    </div>
  )
};

export default Fish;