import React, { useState } from 'react';

function Fly(){
  const [Fly, setFly] = useState('');
  const [FlyType, setFlyType] = useState('');

  return(
    <div>
      <h3>{(Fly && FlyType) && `${Fly} (${FlyType})`}</h3>
      <div className="btn-group btn-group-toggle" data-toggle="buttons">
        <label className="btn btn-secondary" onClick={() => setFlyType('Nymph')}>
          <input type="radio" name="options" id="option1"/> Nymph
        </label>
        <label className="btn btn-secondary" onClick={() => setFlyType('Dry')}>
          <input type="radio" name="options" id="option2"/> Dryfly
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