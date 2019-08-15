import React, {useState} from 'react';

function Form2(props){

    const trout = ['Brown', 'Rainbow', 'Tiger', 'Brook', 'Cutthroat', 'Lake', 'Splake', 'Bull', 'Apache', 'Golden', 'Dolly Varden'];
    const salmon = ['Chinook (King)', 'Coho (Silver)', 'Sockeye (Red)', 'Humpy (Pink)', 'Keta (Chum)', 'Steelhead (Rainbow)', 'Kokanee (Landlocked)'];
    const bass = ['Large Mouth', 'Small Mouth', 'Striper', 'White'];
    const other = ['Muskie', 'Sturgeon', 'Walleye', 'Crappie', 'Sucker', 'Catfish', 'Pike', 'Bluegill', 'Perch', 'Grayling', 'Shad'];

  const [showSpecies, setShowSpecies] = useState(false);
  const [Type, setType] = useState(trout);
  const [Species, setSpecies] = useState('');
  const [Fly, setFly] = useState('');
  const [Length, setLength] = useState('');
  const [Image, setImage] = useState('');

  const speciesList = Type.filter(species => species === '' || species.toLowerCase().startsWith(Species))
  .map((species, i) => (
  <div className='list-item' key={i} value={Type[i] || Species} 
    onClick={() => setSpecies(Type[i])/setShowSpecies(false)/props.setSpecies(Type[i])}>{species}
  </div>));

  // const stateList = States.filter(state => state === '' || state.toLowerCase().startsWith(State))
  // .map((state, i) => (
  // <div className='state' key={i} value={States[i] || State}  
  //   onClick={() => setState(States[i])/setShowStates(false)/props.setState(States[i])}>{state}
  // </div>));

  return(
    <div className='Form2'>
      <div className='Type'>Type <button className='type' onClick={() => setType(trout)/props.setType(trout)}>Trout</button>
        <button className='type' onClick={() => setType(salmon)/props.setType(salmon)}>Salmon</button>
        <button className='type' onClick={() => setType(bass)/props.setType(bass)}>Bass</button>
        <button className='type' onClick={() => setType(other)/props.setType(other)}>Other</button>
      </div>
      <div>Species <input 
        value={Species} 
        onClick={() => setShowSpecies(true)} 
        onChange={e => setSpecies(e.target.value)/ props.setSpecies(e.target.value)}
      />{showSpecies && <button onClick={() => setShowSpecies(false)}>x</button>}
        <div className='list'>{showSpecies && speciesList}</div>
      </div>
      <div>Fly <input value={Fly} onChange={e => setFly(e.target.value)/props.setFly(e.target.value)}/></div>
      <div>Length <input value={Length} onChange={e => setLength(e.target.value)/props.setLength(e.target.value)}/></div>
      <div>Image <input type='url' value={Image} onChange={e => setImage(e.target.value)/props.setImage(e.target.value)}/></div>
      <div></div>
    </div>
  )
};

export default Form2;