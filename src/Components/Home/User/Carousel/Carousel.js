import React from 'react';
import { Carousel, Image } from 'react-bootstrap';
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
              <Image src={image_url} alt='' height='500' />:
              <div className='default'><Image src={Fish} alt='' width='80%'/></div>
            }
          </div>
          <Carousel.Caption >
            <h2 className='c-fish'>
              {species} {(species !== 'Steelhead')? fish_type: ''}
            </h2>
            <div className='c-water'>
              <h4 >{`${water_name} ${water_type },`}</h4> 
              <h4 className='c-water-info'>{us_state}</h4>
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