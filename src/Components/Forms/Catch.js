import React, {useState} from 'react';
import Location from './Location';
import Fish from './Fish/Fish';
import Wheather from './Wheather';

function Catch(){

  // Form1
  const [State, setState] = useState('');
  const [WaterName, setWaterName] = useState('')

  // Form2
  const [Type, setType] = useState('')
  const [Species, setSpecies] = useState('')
  const [FlyType, setFlyType] = useState('') 
  const [Fly, setFly] = useState('')
  // const [Length, setLength] = useState('')
  const [Image, setImage] = useState('')

  // Form3
  const [formPage, setFormPage] = useState(0)

  const Form = [
    <Location 
      State={State} 
      setState={() => setState()} 
      setWaterName={() => setWaterName()}
    />, 
    <Fish 
      setType={() => setType()}
      setSpecies={() => setSpecies()} 
      setFly={() => setFly()} 
      // setLength={() => setLength()} 
      setImage={() =>setImage()}
    />, 
    <Wheather />
  ]

  let handleNext = (num) => {
    setFormPage(formPage + num)
  };
  let handleBack = (num) => {
    setFormPage(formPage - num)
  };

  return(
    <div className='Catch'>
      {Form[formPage]}
      {formPage !== 0 && <button onClick={() => handleBack(1)}>Back</button>}
      <button onClick={() => handleNext(1)}>Next</button>
      <div>{State}, {WaterName}, {Type}, {Species}, {FlyType}, {Fly}, {Image} </div>
    </div>
  )
};

export default Catch;