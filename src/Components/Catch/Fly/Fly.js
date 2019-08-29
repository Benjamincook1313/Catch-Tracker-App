import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Fly(){
  const dispatch = useDispatch();

  const Fly = useSelector(state => state.fly);
  const FlyType = useSelector(state => state.flyType);

  return(
    <div>
      <h2>What fly did you use?</h2>
      <h3>{(Fly && FlyType) && `${Fly} - ${FlyType}`}</h3>
      <div className="btn-group btn-group-toggle" data-toggle="buttons">
        <label className="btn btn-secondary" onClick={() => dispatch({type: 'FLY_TYPE', payload: 'nymph'})}>
          <input type="radio" name="options" id="option1"/> Nymph
        </label>
        <label className="btn btn-secondary" onClick={() => dispatch({type: 'FLY_TYPE', payload: 'dryfly'})}>
          <input type="radio" name="options" id="option2"/> Dryfly
        </label>
        <label className="btn btn-secondary" onClick={() => dispatch({type: 'FLY_TYPE', payload: 'streamer'})}>
          <input type="radio" name="options" id="option3"/> Streamer
        </label>
        <label className="btn btn-secondary" onClick={() => dispatch({type: 'FLY_TYPE', payload: 'popper'})}>
          <input type="radio" name="options" id="option4"/> Popper
        </label>
        <label className="btn btn-secondary" onClick={() => dispatch({type: 'FLY_TYPE', payload: 'mouse'})}>
          <input type="radio" name="options" id="option5"/> Mouse
        </label>
        <label className="btn btn-secondary" onClick={() => dispatch({type: 'FLY_TYPE', payload: 'bead'})}>
          <input type="radio" name="options" id="option6"/> Bead
        </label>
      </div>
      <div>
        <input type='text' value={Fly} onChange={e => dispatch({type: 'FLY', payload: `${e.target.value}`})}/>{FlyType}
      </div>
      <div>
        <input className='btn btn-dark' type='button' value={'< Back'} onClick={() => dispatch({type: 'BACK'})}/>        
        <input className='btn btn-dark' type='button' value={'Next >'} onClick={() => dispatch({type: 'NEXT'})}/>
      </div>
    </div>
  )
};

export default Fly;