import React, { useState } from 'react'

function Form1(){

  const [State, setState] = useState('')
  const [River, setRiver] = useState('')
  const [Species, setSpecies] = useState('')
  const [Length, setLength] = useState('')
  const [Fly, setFly] = useState('')
  const [Wheather, setWheather] = useState('')
  const [Temp, setTemp] = useState() 
  const [Image, setImage] = useState('')
  const [Month, setMonth] = useState('')
  const [TOD, setTOD] = useState('')


  return(
    <div>
      <div>State <input value={State} onChange={ e => setState(e.target.value)}/></div>
      <div>River <input value={River} onChange={e => setRiver(e.target.value)}/></div>
      <div>Species <input value={Species} onChange={e => setSpecies(e.target.value)}/></div>
      <div>Length <input value={Length} onChange={e => setLength('')}/></div>
      <div>Fly <input value={Fly} onChange={e => setFly(e.target.value)}/></div>
      <div>Wheather <input value={Wheather} onChange={e => setWheather(e.target.value)}/></div>
      <div>Image <input value={Image} onChange={e => setImage(e.target.value)}/></div>
      <div>Month <input value={Month} onChange={e => setMonth(e.target.value)}/></div>
      <div>Time Of Day<input value={TOD} onChange={e => setTOD(e.target.value)}/></div>
    </div>
  )
};

export default Form1;