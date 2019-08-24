import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Fly(){
  const dispatch = useDispatch();

  const Fly = useSelector(state => state.fly);
  const FlyType = useSelector(state => state.flyType);

  return(
    <div onSubmit={() => dispatch({type: 'BACK'})}>
      <h2>What fly did you use?</h2>
      <h3>{(Fly && FlyType) && `${Fly} (${FlyType})`}</h3>
      <div className="btn-group btn-group-toggle" data-toggle="buttons">
        <label className="btn btn-secondary" onClick={() => dispatch({type: 'FLY_TYPE', payload: 'Nymph'})}>
          <input type="radio" name="options" id="option1"/> Nymph
        </label>
        <label className="btn btn-secondary" onClick={() => dispatch({type: 'FLY_TYPE', payload: 'Dryfly'})}>
          <input type="radio" name="options" id="option2"/> Dryfly
        </label>
        <label className="btn btn-secondary" onClick={() => dispatch({type: 'FLY_TYPE', payload: 'Streamer'})}>
          <input type="radio" name="options" id="option3"/> Streamer
        </label>
        <label className="btn btn-secondary" onClick={() => dispatch({type: 'FLY_TYPE', payload: 'Popper'})}>
          <input type="radio" name="options" id="option4"/> Popper
        </label>
        <label className="btn btn-secondary" onClick={() => dispatch({type: 'FLY_TYPE', payload: 'Mouse'})}>
          <input type="radio" name="options" id="option5"/> Mouse
        </label>
        <label className="btn btn-secondary" onClick={() => dispatch({type: 'FLY_TYPE', payload: 'Bead'})}>
          <input type="radio" name="options" id="option6"/> Bead
        </label>
      </div>
      <div>{FlyType && <input value={Fly} onChange={e => dispatch({type: 'FLY_TYPE', payload: e.target.value})}/>}{FlyType}</div>
      <div>
        <input type='Submit' value={'Next >'}/>
        <button onClick={() => dispatch({type: 'NEXT'})}>Next</button> 
      </div>
    </div>
  )
};

export default Fly;