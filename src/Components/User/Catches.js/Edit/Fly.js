import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InputGroup, DropdownButton, Dropdown, FormControl } from 'react-bootstrap';

function EditFly(){
  const dispatch = useDispatch()
  const FlyType = useSelector(state => state.flyType)
  const Size = useSelector(state => state.size)
  const Fly = useSelector(state => state.fly)
  const Color = useSelector(state => state.color)

  const flyTypes = ['Dry', 'Streamer', 'Nymph', 'Terrestrial', 'Bead', 'Wet', 'Emerger', 'Salt Water']
  const sizes = ['5/0', '4/0', '3/0', '2/0', '1/0', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 
    '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', 
    '28', '29', '30', '31', '32'
  ];

  const typeList = flyTypes.map((type, i) => 
    <Dropdown.Item key={i} onClick={() => dispatch({type: 'FISH_TYPE', payload: type})}>
      {type}
    </Dropdown.Item>
  );
  const sizeList = sizes.map((size, i) => 
    <Dropdown.Item key={i} onClick={() => dispatch({type: 'SIZE', payload: size})}>
      {size}
    </Dropdown.Item>
  )
  return(
    <div className='Edit-Section'>
      <InputGroup className='inputGroup'>
        <DropdownButton as={InputGroup.Prepend} variant="outline-secondary" title={Size}>
          {sizeList}
        </DropdownButton>
        <DropdownButton as={InputGroup.Append} variant="outline-secondary" title={FlyType}>
          {typeList}
        </DropdownButton>
      </InputGroup>
      <InputGroup className='input'>
        <FormControl value={Fly} onChange={e => dispatch({type: 'FLY', payload: e.target.value})}/>
      </InputGroup>
      <InputGroup>
        <FormControl value={Color || 'enter color'} onChange={e => dispatch({type: 'COLOR', payload: e.target.value})}/>
      </InputGroup>
    </div>
  )
};
export default EditFly;