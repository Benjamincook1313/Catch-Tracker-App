import React, {useState} from 'react';

function Form3(){

  const [Wheather, setWheather] = useState('')
  const [Temp, setTemp] = useState() 
  const [Month, setMonth] = useState('')
  const [TOD, setTOD] = useState('')

  return(
    <div className='Form3'>
      <div>Wheather <input value={Wheather} onChange={e => setWheather(e.target.value)}/></div>
      <div>Temp <input value={Temp} onChange={e => setTemp(e.target.value)} /></div>
      <div>Month <input value={Month} onChange={e => setMonth(e.target.value)}/></div>
      <div>Time Of Day<input value={TOD} onChange={e => setTOD(e.target.value)}/></div>
    </div>
  )
};

export default Form3;