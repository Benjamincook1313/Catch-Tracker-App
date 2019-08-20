import React, {useState} from 'react';
import ImageUpload from './ImageUpload' 

function Fish(props){

  const trout = ['Apache', 'Bull', 'Brook','Brown', 'Cutthroat', 'Dolly Varden','Golden', 'Lake', 'Rainbow', 'Splake', 'Tiger'];
  const salmon = ['Atlantic', 'Chinook (King)', 'Coho (Silver)', 'Humpy (Pink)', 'Keta (Chum)',  'Kokanee', 'Sockeye (Red)', 'Steelhead (Rainbow)'];
  const bass = ['Large Mouth', 'Small Mouth', 'Striper', 'White'];
  const other = ['Alligator Gar', 'Bluegill', 'Crappie', 'Catfish', 'Grayling', 'Herring', 'Muskie', 'Pike', 'Perch', 'Shad','Sturgeon', 'Sucker', 'Walleye'];

  const [showSpecies, setShowSpecies] = useState(false);
  const [Type, setType] = useState([]);
  const [SelectedType, setSelectedType] = useState('')
  const [Species, setSpecies] = useState('');

  const filtered = Type.filter(species => species === '' || species.toLowerCase().startsWith(Species))
  const speciesList = filtered.map((species, i) => (
  <div className='list-item' key={i} value={Type[i] || Species} 
    onClick={() => setSpecies(filtered[i])/setShowSpecies(false)}>
    {species}
  </div>));

  return(
    <div className='Fish'>
      <h2>What kind of Fish?</h2>
        <div className="btn-group btn-group-toggle" data-toggle="buttons">
          <label className="btn btn-secondary" 
            onClick={() => setType(trout)/
              setShowSpecies(true)/
              setSelectedType('Trout')
            } 
          >
            <input type="radio" name="options" id="option1" autoComplete="off"/> Trout
          </label>
          <label className="btn btn-secondary" 
            onClick={() => setType(salmon)/
              setShowSpecies(true)/
              setSelectedType('Salmon')
            } 
          >
            <input type="radio" name="options" id="option2" autoComplete="off" /> Salmon
          </label>
          <label className="btn btn-secondary" 
            onClick={() => setType(bass)/
              setShowSpecies(true)/
              setSelectedType('Salmon')
            } 
          >
            <input type="radio" name="options" id="option3" autoComplete="off" /> Bass
          </label>
          <label className="btn btn-secondary" 
            onClick={() => setType(other)/
              setShowSpecies(true)/
              setSelectedType('')} >
            <input type="radio" name="options" id="option4" autoComplete="off" /> Other
          </label>
        </div>
      <div>
        {showSpecies && 
          <input 
            value={Species}
            placeholder={'Species'}
            onClick={() => setShowSpecies(true)}
            onChange={e => setSpecies(e.target.value)}
          />
        }
      {Species && 
        <h3>
          {`${Species} ${SelectedType}`} 
          <button onClick={() => setShowSpecies(false)/setType([])/setSelectedType('')}>x</button>
        </h3>}
        <div className='list'>{showSpecies && speciesList}</div>
      </div>
      <ImageUpload />
    </div>
  )
};

export default Fish;