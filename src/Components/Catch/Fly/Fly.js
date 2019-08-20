import React, { useState } from 'react';

function Fly(){


  const [Fly, setFly] = useState('');
  const [FlyType, setFlyType] = useState('');

  return(
    <div>
      <div>
        <button className='fly-type' onClick={() => setFlyType('Nymph')}>Nymph</button>
        <button className='fly-type' onClick={() => setFlyType('Dry Fly')}>Dry</button>
        <button className='fly-type' onClick={() => setFlyType('Streamer')}>Streamer</button>
        <button className='fly-type' onClick={() => setFlyType('Popper')}>Popper</button>
        <button className='fly-type' onClick={() => setFlyType('Mouse')}>Mouse</button>
        <button className='fly-type' onClick={() => setFlyType('Bead')}>Bead</button>
      </div>
      <div className="btn-group btn-group-toggle" data-toggle="buttons">
        <label className="btn btn-secondary active" onClick={() => setFlyType('Nymph')}>
          <input type="radio" name="options" id="option1"/> Nymph
        </label>
        <label className="btn btn-secondary" onClick={() => setFlyType('Dry')}>
          <input type="radio" name="options" id="option2"/> Dry
        </label>
        <label className="btn btn-secondary" onClick={() => setFlyType('Streamer')}>
          <input type="radio" name="options" id="option3"/> Streamer
        </label>
        <label className="btn btn-secondary" onClick={() => setFlyType('Popper')}>
          <input type="radio" name="options" id="option4"/> Popper
        </label>
        <label className="btn btn-secondary" onClick={() => setFlyType('Mouse')}>
          <input type="radio" name="options" id="option5"/> Mouse
        </label>
        <label className="btn btn-secondary" onClick={() => setFlyType('Bead')}>
          <input type="radio" name="options" id="option6"/> Bead
        </label>
      </div>
      <div>{FlyType && <input value={Fly} onChange={e => setFly(e.target.value)}/>}{FlyType}</div>
    </div>
  )
};

export default Fly;