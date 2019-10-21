import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditCatch from './Edit/EditCatch';
import Delete from './Delete';
import { OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSnowflake, faCloudRain, faCloudSunRain, faCloudSun, faSun, faCloud, faFish } from '@fortawesome/free-solid-svg-icons'
import Fish from '../../../../Images/fish.png';
import axios from 'axios';

function Catch(props){
  const { userCatch, refresh } = props
  const { catch_id, date, tod, water_name, water_type, us_state, temperature, 
    weather, image_url, length, fish_type, species, size, color, fly, 
    fly_type, details } = userCatch
    
  const dispatch = useDispatch(props)
  const reduxState = useSelector(state => state) 
  const user = useSelector(state => state.user)
  const [showOptions, setShowOptions] = useState(false)
  const [edit, setEdit] = useState(false)
  const [Dlt, setDelete] = useState(false)

  const Sun = <FontAwesomeIcon className='weather-icon2 sun' icon={faSun} />
  const Cloud = <FontAwesomeIcon className='weather-icon2 cloud' icon={faCloud}/>
  const Rain = <FontAwesomeIcon className='weather-icon2 rain' icon={faCloudRain}/>
  const Snow = <FontAwesomeIcon className='weather-icon2 snow' icon={faSnowflake}/>
  const Pc = <FontAwesomeIcon className='weather-icon2 pc' icon={faCloudSun}/>
  const Pcr = <FontAwesomeIcon className='weather-icon2 pcr' icon={faCloudSunRain}/>
  const fish = <FontAwesomeIcon className='fish' icon={faFish}/>

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

  const handleDelete=async(props)=>{
    let res = await axios.put(`/api/deleteCatch/${catch_id}`, reduxState)
    if(res.data){
      dispatch({type: 'CLEAR_CATCH'})
      dispatch({type: 'CATCHES', payload: res.data})
      setDelete(false)
      refresh()
    }
  };

  return(
    <div className='Catch'>
      {Dlt && 
        <Delete 
          cancel={() => setDelete(false)} 
          handleDelete={handleDelete} 
          setShowOptions={() => setShowOptions(false)}
          refresh={refresh}
        />
      }
      {edit && 
        <EditCatch 
          userCatch={userCatch} 
          setEdit={() => setEdit(false)} 
          refresh={refresh} 
          setShowOptions={() => setShowOptions(false)}
        />
      }
      <div className='location'>
        <h6 className='location-item'>{`${water_name} ${water_type}`}</h6> 
        <h5 className='location-item'>{`${us_state}`|| user.state}</h5>
      </div>
      <Button className='options-btn' 
        size='sm' variant='outline-light'
        onClick={() => setShowOptions(!showOptions)}>
        {fish}{fish}{fish}
      </Button>
      {showOptions &&
        <div className='options'>
          <div className='option-btns' onClick={() => setEdit(true)/dispatch({type: 'EDIT_CATCH', payload: userCatch})}>Edit</div>
          <div className='option-btns' onClick={() => setDelete(true)/dispatch({type: 'EDIT_CATCH', payload: userCatch})}>Delete</div>
        </div>
      }
      <OverlayTrigger placement='right' overlay={
        <Tooltip className='tooltip'>
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
              <p>{date? date.split(' ').shift(): ''}</p>
              <p>{date? date.split(' ').slice(1,3).join(' '): ''}</p>
            </div>
            }
          </div>
          <div className='fish-info'>
            <h6>Fish:</h6>
            <div className='fishInfo'>
              <p style={{textTransform: 'capitalize'}}>{`${length} ${species}`}</p>
              <p style={{textTransform: 'capitalize'}}>{fish_type}</p>
            </div>
          </div>
          <div className='fly'>
            <h6>Fly:</h6>
            <div className='fly-info'>
              <p>#{size} {fly_type}</p> 
              <p>{color} {fly}</p>
            </div>
          </div>
          {details &&
            <div className='details'>
              <h6 className='d-title'>Details</h6>
              <p>{details}</p> 
            </div>
          }
        </Tooltip>
        }>
        {image_url?
          <img className='catch-img' src={image_url} alt='' height='200' />:
          <img className='d-img' src={Fish} alt='' height='200'/>
        }
      </OverlayTrigger>
    </div>
  )
};

export default Catch;