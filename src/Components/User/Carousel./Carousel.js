import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFish } from '@fortawesome/free-solid-svg-icons';
import Image from './Images'
import './Carousel.css'


function CatchCarousel(){
  const Catches = useSelector(state => state.catches)
  
  let userCatch = Catches.reverse().slice(0,4).map((userCatch, i) => {
    let { fish_type, species, water_name, water_type, state } = userCatch
    return (
        <Carousel.Item key={i}>
          <Image userCatch={userCatch}/>
          <Carousel.Caption >
            <h3 className='c-fish'>
              {species} {(species !== 'Steelhead')? fish_type: ''}
            </h3>
            <div className='c-water'>
              <h5>{water_name} {water_type+','}</h5>
              <h5>{state}</h5>
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