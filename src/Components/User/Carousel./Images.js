import React, { useEffect, useState } from 'react';
import { storage } from '../../../Firebase/index';
import { useSelector } from 'react-redux';
// import Img from 'react-bootstrap/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFish } from '@fortawesome/free-solid-svg-icons';
import Fish from '../../../Images/fish.png';
import './Carousel.css';


function Catch(props){
  const { image_name } = props.userCatch
  const user = useSelector(state => state.user)

  const [Image, setImage] = useState('')

  const fish = <FontAwesomeIcon className='fish' icon={faFish}/>

  useEffect(() => {
    if(user.user_name && image_name){
      storage.ref(`images/${user.user_name}`).child(image_name).getDownloadURL().then(url => {
        setImage(url)
      })
    }
  });


  return(
    <div className='Image'>
      {Image? 
        <img src={Image} alt='' height='500' />:
        <img src={Fish} alt='' width='400'/>
      }
    </div>
  )
};

export default Catch;