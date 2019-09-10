import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../Catch.css';

function Fly(){
  const dispatch = useDispatch();

  const Fly = useSelector(state => state.fly);
  const FlyType = useSelector(state => state.flyType);
  const Size = useSelector(state => state.size);

  const [showSizes, setShowSizes] = useState(false);

  const sizes = ['5/0', '4/0', '3/0', '2/0', '1/0', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', 
    '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32'
  ];

  let size = sizes.map((size, i) => 
    <div className='list-item' key={i} onClick={() => dispatch({type: 'SIZE', payload: sizes[i]})/setShowSizes(false)}>
      {size}
    </div>  
  );

  return(
    <div>
      <h2>What fly did you use?</h2>
      <h3>{(Fly && FlyType) && `${Fly} - ${FlyType}`}</h3>
      <h5>{Size && `size: ${Size}`}</h5>
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
      <div>
        <input type='text' value={Fly} placeholder='fly' onChange={e => dispatch({type: 'FLY', payload: `${e.target.value}`})}/>
        {FlyType}
      </div>
      <div>
        <input type='text' value={Size} placeholder='size' 
          onClick={() => setShowSizes(true)}
          onChange={e => dispatch({type: 'SIZE', payload: `${e.target.value}`})}
          readOnly
        />
        {/* {showSizes && <button onClick={() => setShowSizes(false)}>x</button>} */}
        {showSizes && 
        <div className='list'>
          {size}
        </div>
        }
      </div>
      <br/>
      <div>
        <input className='btn btn-dark' type='button' value={'< Back'} onClick={() => dispatch({type: 'BACK'})}/>        
        <input className='btn btn-dark' type='button' value={'Next >'} onClick={() => dispatch({type: 'NEXT'})}/>
      </div>
    </div>
  )
};

export default Fly;