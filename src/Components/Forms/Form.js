import React, {useState} from 'react';
import Form1 from './Form1';
import Form2 from './Form2';
import Form3 from './Form3';
import FormReview from './FormReview'

function Form(){

  // Form1
  const [State, setState] = useState('');
  const [River, setRiver] = useState('');

  // Form2
  const [Type, setType] = useState('')
  const [Species, setSpecies] = useState('')
  const [Fly, setFly] = useState('')
  const [Length, setLength] = useState('')
  const [Image, setImage] = useState('')

  // Form3


  const [formIndex, setFormIndex] = useState(0)
  const Form = [
    <Form1 
      River={River} 
      State={State} 
      setState={() => setState()} 
      setRiver={() => setRiver()}
    />, 
    <Form2 
      setType={() => setType()}
      setSpecies={() => setSpecies()} 
      setFly={() => setFly()} 
      setLength={() => setLength()} 
      setImage={() =>setImage()}
    />, 
    <Form3 />,
    <FormReview />
  ]

  let handleNext = (num) => {
    setFormIndex(formIndex + num)
  };
  let handleBack = (num) => {
    setFormIndex(formIndex - num)
  };

  return(
    <div className='Form4'>
      {Form[formIndex]}
      {formIndex !== 0 && <button onClick={() => handleBack(1)}>Back</button>}
      <button onClick={() => handleNext(1)}>Next</button>
    </div>
  )
};

export default Form;