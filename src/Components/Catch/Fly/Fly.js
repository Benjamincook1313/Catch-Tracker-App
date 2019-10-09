import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToggleButton, ToggleButtonGroup, Button, FormControl } from 'react-bootstrap';
import Scroll from 'react-scrollbar';
import './Fly.css';

function Fly(){
  const dispatch = useDispatch();

  const Fly = useSelector(state => state.fly);
  const FlyType = useSelector(state => state.flyType);
  const Size = useSelector(state => state.size);
  const Color = useSelector(state => state.color)

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
      <h2 className='Fly-title'>What fly did you use?</h2>
      <h5 className='preview'>{Size && `#${Size}`}</h5>
      <h3 className='preview'>{(Fly && FlyType) && `${Color || ''} ${ Fly}`}</h3>
      <h4 className='preview'>{FlyType}</h4>
      <div className='Button-Group'>
        <ToggleButtonGroup type='radio' name='fly' defaultValue={FlyType}>
          <ToggleButton variant='outline-secondary' value="dry" 
            onClick={() => dispatch({type: 'FLY_TYPE', payload: 'dry'})}>
            <div className='fly-btn'>Dry</div>
          </ToggleButton>
          <ToggleButton variant='outline-secondary' value="streamer" 
            onClick={() => dispatch({type: 'FLY_TYPE', payload: 'streamer'})}>
            <div className='fly-btn'>Streamer</div>
          </ToggleButton>
          <ToggleButton variant='outline-secondary' value="nymph" 
            onClick={() => dispatch({type: 'FLY_TYPE', payload: 'nymph'})}>
            <div className='fly-btn'>Nymph</div>
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <div className='Button-Group'>
        <ToggleButtonGroup type='radio' name='fly' defaultValue={FlyType}>
          <ToggleButton variant='outline-secondary' value="wet" 
            onClick={() => dispatch({type: 'FLY_TYPE', payload: 'wet'})}>
            <div className='fly-btn'>Wet</div>
          </ToggleButton>
          <ToggleButton variant='outline-secondary' value="emerger" 
            onClick={() => dispatch({type: 'FLY_TYPE', payload: 'emerger'})}>
            <div className='fly-btn'>Emerger</div>
          </ToggleButton>
          <ToggleButton variant='outline-secondary' value="terestrial" 
            onClick={() => dispatch({type: 'FLY_TYPE', payload: 'terrestrial'})}>
            <div className='fly-btn'>Terrestrial</div>
          </ToggleButton>
          <ToggleButton variant='outline-secondary' value="salt water" 
            onClick={() => dispatch({type: 'FLY_TYPE', payload: 'salt water'})}>
            <div className='fly-btn'>Salt Water</div>
          </ToggleButton>
          <ToggleButton variant='outline-secondary' value="bead" 
            onClick={() => dispatch({type: 'FLY_TYPE', payload: 'bead'})}>
            <div className='fly-btn'>Bead</div>
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <div className='size-color'>
        <input className='input' type='text' value={Size} placeholder='size' 
          onClick={() => setShowSizes(true)}
          onChange={e => dispatch({type: 'SIZE', payload: `${e.target.value}`})}
          readOnly
        />
        <input className='input' placeholder='color' value={Color} onChange={e => dispatch({type: 'COLOR', payload: e.target.value})}/>
        {showSizes && 
        <Scroll className='list'>
          {size}
        </Scroll>
        }
      </div>
      <div>
        <input type='text' value={Fly} placeholder='fly' 
          onChange={e => dispatch({type: 'FLY', payload: `${e.target.value}`})}/>
      </div>
      <br/>
      <div>
        <Button className='page-nav' variant='dark' onClick={() => dispatch({type: 'BACK'})}>
          {'< Back'}   
        </Button>     
        <Button className='page-nav' variant='dark' onClick={() => dispatch({type: 'NEXT'})}>
          {'Next >'}
        </Button>
      </div>
    </div>
  )
};

export default Fly;