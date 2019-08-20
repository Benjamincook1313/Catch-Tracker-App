import React, {useState} from 'react';
import Location from './Location/Location';
import Wheather from './Wheather/Wheather';
import Fish from './Fish/Fish';
import Fly from './Fly/Fly'

function Catch(props){

  const [formPage, setFormPage] = useState(0);

  // Location
  // const [State, setState] = useState('');
  // const [WaterName, setWaterName] = useState('');

  // Fish
  // const [Type, setType] = useState('');
  // const [Species, setSpecies] = useState('');
  // const [Image, setImage] = useState('');

  // Fly
  // const [Fly, setFly] = useState('');

  // Wheather
  // const [Wheather, setWheather] = useState('');

  const Form = [
    <Location />, 
    <Wheather />, 
    <Fish />, 
    <Fly />,
  ];
  
  let handleNext=()=>{
    setFormPage(formPage + 1)
  };
  let handleBack=(num)=>{
    setFormPage(formPage - 1)
  };

  return(
    <div className='Catch'>
      <section>
        {Form[formPage]}
      </section>
      <br/>  
      <div>    
        <button onClick={handleBack}>Back</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  )
};

export default Catch;
