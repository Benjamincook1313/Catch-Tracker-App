import React from 'react';
import { Carousel } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Fish from '../../../../Images/fish.png';
import './Carousel.css'


function CatchCarousel(){
  const Catches = useSelector(state => state.catches)
  // const User = useSelector(state => state.user)
  
  let userCatch = Catches.reverse().slice(0, 5).map((userCatch, i) => {
    let { fish_type, species, water_name, water_type, us_state, image_url } = userCatch
    return (
        <Carousel.Item key={i}>
          <div className='Image'>
            {image_url? 
              <img src={image_url} alt='' height='400' />:
              <img src={Fish} alt='' width='400'/>
            }
          </div>
          <Carousel.Caption >
            <h3 className='c-fish'>
              {species} {(species !== 'Steelhead')? fish_type: ''}
            </h3>
            <div className='c-water'>
              <h5 >{`${water_name} ${water_type },`}</h5> 
              <h5 className='c-water-info'>{us_state}</h5>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      )
    });
  return(
    <div className='Carousel'>
      <Carousel className='carousel'>
        {userCatch}
      </Carousel>
    </div>
  )
};

export default CatchCarousel;