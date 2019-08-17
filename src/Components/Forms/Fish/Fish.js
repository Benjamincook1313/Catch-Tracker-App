import React, {useState} from 'react';
import ImageUpload from './ImageUpload' 

function Fish(props){

  const trout = ['Apache', 'Bull', 'Brook','Brown', 'Cutthroat', 'Dolly Varden','Golden', 'Lake', 'Rainbow', 'Splake', 'Tiger'];
  const salmon = ['Atlantic', 'Chinook (King)', 'Coho (Silver)', 'Humpy (Pink)', 'Keta (Chum)',  'Kokanee (Landlocked)', 'Sockeye (Red)', 'Steelhead (Rainbow)'];
  const bass = ['Large Mouth', 'Small Mouth', 'Striper', 'White'];
  const other = ['Alligator Gar', 'Bluegill', 'Crappie', 'Catfish', 'Grayling', 'herring', 'Muskie', 'Pike', 'Perch', 'Shad','Sturgeon', 'Sucker', 'Walleye'];
  const nothing = []

  // const streamers = [];
  // const dryFlies = [];
  // const nymphs = [];
  // const bead = []

  const [showSpecies, setShowSpecies] = useState(false);
  const [Type, setType] = useState(nothing);
  const [Species, setSpecies] = useState('');
  // const [Length, setLength] = useState('');
  const [FlyType, setFlyType] = useState('')
  const [Fly, setFly] = useState('');
  // const [Image, setImage] = useState([]);
  // const [ImageName, setImageName] = useState('');

  const filteredSpecies = Type.filter(species => species === '' || species.toLowerCase().startsWith(Species))
  const speciesList = filteredSpecies.map((species, i) => (
  <div className='list-item' key={i} value={Type[i] || Species} 
    onClick={() => setSpecies(filteredSpecies[i])/setShowSpecies(false)/props.setSpecies(filteredSpecies[i])}>{species}
  </div>));

  return(
    <div className='Form2'>
      <h2>What kind of Fish?</h2>
      <div className='fish-type'>
        <button className='type' onClick={() => setType(trout)/props.setType(trout)/setShowSpecies(true)}>Trout</button>
        <button className='type' onClick={() => setType(salmon)/props.setType(salmon)/setShowSpecies(true)}>Salmon</button>
        <button className='type' onClick={() => setType(bass)/props.setType(bass)/setShowSpecies(true)}>Bass</button>
        <button className='type' onClick={() => setType(other)/props.setType(other/setShowSpecies(true))}>Other</button>
      </div>
      <div>{(Type !== nothing) && <input 
        value={Species}
        placeholder={'Species'}
        onClick={() => setShowSpecies(true)}
        onKeyPress={() => setShowSpecies(true)} 
        onChange={e => setSpecies(e.target.value)/ props.setSpecies(e.target.value)}
      />}
      {showSpecies && <button onClick={() => setShowSpecies(false)/setType(nothing)}>x</button>}
        <div className='list'>{showSpecies && speciesList}</div>
      </div>
      <ImageUpload />
      <div>
        <button className='fly-type' onClick={() => setFlyType('Streamer')}>Streamer</button>
        <button className='fly-type' onClick={() => setFlyType('Dry Fly')}>Dry</button>
        <button className='fly-type' onClick={() => setFlyType('Nymph')}>Nymph</button>
        <button className='fly-type' onClick={() => setFlyType('Bead')}>Bead</button>
      </div>
      <div>{FlyType && <input value={Fly} onChange={e => setFly(e.target.value)/props.setFly(e.target.value)}/>}{ FlyType}</div>
    </div>
  )
};

export default Fish;