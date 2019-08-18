import React, {useState} from 'react';

function Fly(){
  const [FlyType, setFlyType] = useState('');
  const [Fly, setFly] = useState('');

  // const streamers = [];
  // const dryFlies = [];
  // const nymphs = [];
  // const beads = []

  return (
    <div className='Fly'>
      <div>
        <button className='fly-type' onClick={() => setFlyType('Streamer')}>Streamer</button>
        <button className='fly-type' onClick={() => setFlyType('Dry Fly')}>Dry</button>
        <button className='fly-type' onClick={() => setFlyType('Nymph')}>Nymph</button>
        <button className='fly-type' onClick={() => setFlyType('Bead')}>Bead</button>
      </div>
      <div>{FlyType && <input value={Fly} onChange={e => setFly(e.target.value)}/>}{FlyType}</div>
    </div>
  )
}

export default Fly;