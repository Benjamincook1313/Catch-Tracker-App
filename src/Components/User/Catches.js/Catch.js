import React, { useEffect, useState } from 'react';
import { storage } from '../../../Firebase/index';
import { useSelector, useDispatch } from 'react-redux';
import { OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSnowflake, faCloudRain, faCloudSunRain, faCloudSun, faSun, faCloud, faFish } from '@fortawesome/free-solid-svg-icons'
import Fish from '../../../Images/fish.png';
import axios from 'axios';

function Catch(props){
  const { date, tod, water_name, water_type, state, temperature, 
    weather, image_name, length, fish_type, species, size, fly, fly_type, color, comments } = props.userCatch
    
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const [Image, setImage] = useState('')
  const [showOptions, setShowOptions] = useState(true)

  const Sun = <FontAwesomeIcon className='weather-icon2 sun' icon={faSun} />
  const Cloud = <FontAwesomeIcon className='weather-icon2 cloud' icon={faCloud}/>
  const Rain = <FontAwesomeIcon className='weather-icon2 rain' icon={faCloudRain}/>
  const Snow = <FontAwesomeIcon className='weather-icon2 snow' icon={faSnowflake}/>
  const Pc = <FontAwesomeIcon className='weather-icon2 pc' icon={faCloudSun}/>
  const Pcr = <FontAwesomeIcon className='weather-icon2 pcr' icon={faCloudSunRain}/>
  const fish = <FontAwesomeIcon className='fish' icon={faFish}/>

  useEffect(() => {
    if(user.user_name){
      storage.ref(`images/${user.user_name}`).child(image_name).getDownloadURL().then(url => {
        setImage(url)
      })
    }
  });

  const kindOfWeather = (Weather) => {
    switch(Weather){
      case 'Rainy':
        return Rain
      case 'Cloudy':
        return Cloud
      case 'Sunny':
        return Sun
      case 'Snowy':
        return Snow
      case 'Partly-Cloudy':
        return Pc
      case 'Light-Showers':
        return Pcr
      default:
        return ''
    }
  };

  const handleEdit = (id) => {
    console.log(id)
    axios.get('/api/getCatch:`${id}`')
  };

  console.log(props.userCatch)
  return(
    <div className='Catch'>
      <div className='location'>
        <h6 className='location-item'>{`${water_name} ${water_type}`}</h6> 
        <h5 className='location-item'>{`${state}`}</h5>
      </div>
      <Button className='options-btn' 
        size='sm' variant='outline-light'
        onClick={() => setShowOptions(!showOptions)}>
        {fish}{fish}{fish}
      </Button>
      {showOptions &&
        <div className='options'>
          <button className='option-btns'
            onClick={() => (
              dispatch({type: 'EDIT_CATCH', payload: true})/
              dispatch({type: 'SET_CATCH', payload: props.userCatch[props.key]})/
              console.log(props.userCatch)
            )}>
            edit
          </button>
          <button className='option-btns'>delete</button>
        </div>
      }
      <OverlayTrigger placement='right' overlay={
        <Tooltip>
          <div className='date-time'>
            <div className='weather'>
              <p>{kindOfWeather(weather)}</p>
              <p className='temp'>{temperature}</p>
            </div>
            {tod?
              <div className='date'>
                <p>{tod}</p>
                <p>{date}</p>
            </div>:
            <div className='date'>
              <p>{date.split(' ').shift()}</p>
              <p>{date.split(' ').slice(1,3).join(' ')}</p>
            </div>
            }
          </div>
          <div className='fish-info'>
            <h6>Fish:</h6>
            <p>{`${length}" ${species} ${fish_type}`}</p>
          </div>
          <div className='fly'>
            <h6>Fly:</h6>
            <div className='fly-info'>
              <p>#{size} {fly_type}</p> 
              <p>{color} {fly}</p>
            </div>
          </div>
          {comments &&
            <div className='details'>
              <h6 className='d-title'>Details</h6>
              <p>{comments}</p> 
            </div>
          }
        </Tooltip>
        }>
        {Image?
          <img className='catch-img' src={Image} alt='' height='210' />:
          <img className='d-img' src={Fish} alt='' height='200'/>
        }
      </OverlayTrigger>
    </div>
  )
};

export default Catch;