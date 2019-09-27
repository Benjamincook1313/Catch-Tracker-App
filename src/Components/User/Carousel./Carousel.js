import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFish } from '@fortawesome/free-solid-svg-icons';
import Image from './Images'
import './Carousel.css'


function CatchCarousel(){
  const Catches = useSelector(state => state.catches)
  
  let userCatch = Catches.reverse().slice(0,4).map((userCatch) => {
    return (
      <Image key={userCatch.catch_id} userCatch={userCatch}/>
      )
    });
    const catchInfo = Catches.reverse().slice(0,4)

    console.log(catchInfo[0])
  return(
    <div className='Carousel'>
      <Carousel className='carousel'>
        <Carousel.Item>
          {userCatch[0]}
          <Carousel.Caption>
            {/* <h3>`${catchInfo[0]}`</h3> */}
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
        {userCatch[1]}
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
        {userCatch[2]}
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
        {userCatch[3]}
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
        {userCatch[4]}
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  )
};

export default CatchCarousel;