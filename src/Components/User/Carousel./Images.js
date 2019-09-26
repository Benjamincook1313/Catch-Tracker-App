import React, { useEffect, useState } from 'react';
import { storage } from '../../../Firebase/index';
import { useSelector } from 'react-redux';
import { OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFish } from '@fortawesome/free-solid-svg-icons';
import Fish from '../../../Images/fish.png';
import './Carousel.css'


function Catch(props){
  const { image_name } = props.userCatch
  const user = useSelector(state => state.user)

  const [Image, setImage] = useState('')
  const [showOptions, setShowOptions] = useState(false)

  const fish = <FontAwesomeIcon className='fish' icon={faFish}/>

  useEffect(() => {
    if(user.user_name){
      storage.ref(`images/${user.user_name}`).child(image_name).getDownloadURL().then(url => {
        setImage(url)
      })
    }
  });


  return(
    <div className='Image'>
      <Button className='img-opts-btn' 
        size='sm' variant='outline-light'
        onClick={() => setShowOptions(!showOptions)} >
        {fish}{fish}{fish}
      </Button>
      {showOptions &&
        <div className='img-opts'>
          <button className='option-btns'>edit</button>
          <button className='option-btns'>delete</button>
        </div>
      }
      <img src={Image} alt={Fish} height='500'/>
    </div>
  )
};

export default Catch;