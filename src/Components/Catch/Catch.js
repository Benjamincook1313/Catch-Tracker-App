import React, {useState} from 'react';
import Location from './Location/Location';
import Wheather from './Wheather/Wheather';
import Fish from './Fish/Fish';
import Fly from './Fly/Fly'
import ReviewCatch from './ReviewCatch/ReviewCatch';

function Catch(props){

  const [formPage, setFormPage] = useState(0);

  const Form = [
    <Location />, 
    <Wheather />, 
    <Fish />, 
    <Fly />,
    <ReviewCatch />
  ];
  
  let handleNext=()=>{
    setFormPage(formPage + 1)
  };
  let handleBack=()=>{
    if(formPage)
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
        {(formPage !== 4) && <button onClick={handleNext}>Next</button>}
      </div>
    </div>
  )
};

export default Catch;
