import React, {useState} from 'react';
import Location from '../Location/Location';
import Fish from '../Fish/Fish';
import Wheather from '../Wheather/Wheather';
import Fly from '../Fly/Fly'

function Catch(props){

  // const [formPage, setFormPage] = useState(0);

  // Location
  const [State, setState] = useState('');
  const [WaterName, setWaterName] = useState('');

  // Fish
  const [Type, setType] = useState('');
  const [Species, setSpecies] = useState('');
  const [Image, setImage] = useState('');

  // Fly
  const [Fly, setFly] = useState('');

  // Wheather
  const [Wheather, setWheather] = useState('');

  // const Form = [
  //   <Location 
  //     setState={() => setState()} 
  //     setWaterName={() => setWaterName()}
  //   />, 

  //   <Fish 
  //     setType={() => setType()}
  //     setSpecies={() => setSpecies()} 
  //     setImage={() =>setImage()}
  //   />, 
      
  //   <Fly 
  //     setFly={() => setFly()} 
  //   />,

  //   <Wheather />
  // ];

  let handleNext=()=>{
    // setFormPage(formPage + 1)
  };
  let handleBack=(num)=>{
    // setFormPage(formPage - 1)
  };

  return(
    <div className='Catch'>
      <Location />
      <Fish />
      <Fly />
      <Wheather />
      {/* {formPage !== 0 && } */}
      <button onClick={handleBack}>Back</button>
      <button onClick={handleNext}>Next</button>
      <div>{State}, {WaterName}, {Type}, {Species}, {Fly}, {Image} </div>
    </div>
  )
};

export default Catch;