import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToggleButton, ToggleButtonGroup, Button } from 'react-bootstrap';
import Scroll from 'react-scrollbar';
import './Fly.css';

function Fly(){
  const dispatch = useDispatch();

  const Fly = useSelector(state => state.fly);
  const FlyType = useSelector(state => state.flyType);
  const Size = useSelector(state => state.size);

  const [showSizes, setShowSizes] = useState(false);

  const sizes = ['5/0', '4/0', '3/0', '2/0', '1/0', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 
    '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', 
    '28', '29', '30', '31', '32'
  ];

  let size = sizes.map((size, i) => 
    <div className='list-item' key={i} onClick={() => dispatch({type: 'SIZE', payload: sizes[i]})/
      setShowSizes(false)}>
      {size}
    </div>  
  );

  return(
    <div className='Fly'>
      <h2>What fly did you use?</h2>
      <h3 className='preview'>{(Fly && FlyType) && `${Fly} - ${FlyType}`}</h3>
      <h5>{Size && `size: ${Size}`}</h5>
      <div>
        <input type='text' value={Fly} placeholder='fly' 
          onChange={e => dispatch({type: 'FLY', payload: `${e.target.value}`})}/>
      </div>
      <ToggleButtonGroup className='ButtonGroup' type='radio' name='fly' >
        <ToggleButton variant='outline-secondary' value="1" 
          onClick={() => dispatch({type: 'FLY_TYPE', payload: 'Nymph'})}>
          <div className='fly-btn'>Nymph</div>
        </ToggleButton>
        <ToggleButton variant='outline-secondary' value="2" 
          onClick={() => dispatch({type: 'FLY_TYPE', payload: 'Dry'})}>
          <div className='fly-btn'>Dry</div>
        </ToggleButton>
        <ToggleButton variant='outline-secondary' value="3" 
          onClick={() => dispatch({type: 'FLY_TYPE', payload: 'Streamer'})}>
          <div className='fly-btn'>Streamer</div>
        </ToggleButton>
        <ToggleButton variant='outline-secondary' value="6" 
          onClick={() => dispatch({type: 'FLY_TYPE', payload: 'Bead'})}>
          <div className='fly-btn'>Bead</div>
        </ToggleButton>
      </ToggleButtonGroup>
      <div>
        <input className='size' type='text' value={Size} placeholder='size' 
          onClick={() => setShowSizes(true)}
          onChange={e => dispatch({type: 'SIZE', payload: `${e.target.value}`})}
          readOnly
        />
        {showSizes && 
        <Scroll className='list'>
          {size}
        </Scroll>
        }
      </div>
      <br/>
      <div>
        <Button variant='dark' onClick={() => dispatch({type: 'BACK'})}>
          {'< Back'}   
        </Button>     
        <Button variant='dark' onClick={() => dispatch({type: 'NEXT'})}>
          {'Next >'}
        </Button>
      </div>
    </div>
  )
};

export default Fly;