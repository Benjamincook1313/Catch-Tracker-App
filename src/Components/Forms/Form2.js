import React, {useState} from 'react';

function Form2(props){

  const fishSpecies = [
    {Trout: ['Brown', 'Rainbow', 'Tiger', 'Brook', 'Cutthroat', 'Lake', 'Splake', 'Bull', 'Apache', 'Golden', 'Dolly Varden']},
    {Salmon: ['Chinook (King)', 'Coho (silver)', 'Sockeye (Red)', 'Humpy (Pink)', 'Keta (Chum)', 'Steelhead (Rainbow)', 'Kokanee (Landlocked)']},
    {Bass: ['LargeMouth', 'SmallMouth', 'Striper', 'White', 'Sea']},
    {Other: ['Muskie', 'Sturgeon', 'Walleye', 'Crappie', 'Sucker', 'Catfish', 'Pike', 'Bluegill', 'Perch'] }
  ]

  const [Species, setSpecies] = useState('')
  const [Fly, setFly] = useState('')
  const [Length, setLength] = useState('')
  const [Image, setImage] = useState('')

  return(
    <div className='Form2'>
      <div>* Species <input value={Species} onChange={e => setSpecies(e.target.value)/ props.setSpecies(e.target.value)}/></div>
      <div>* Fly <input value={Fly} onChange={e => setFly(e.target.value)/ props.setFly(e.target.value)}/></div>
      <div>Length<input value={Length} onChange={e => setLength(e.target.value)/props.setLength(e.target.value)}/></div>
      <div>Image <input type='url' value={Image} onChange={e => setImage(e.target.value)/props.setImage(e.target.value)}/></div>
    </div>
  )
};

export default Form2;