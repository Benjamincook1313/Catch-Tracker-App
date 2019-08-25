import React from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

function ReviewCatch(){
  const date = useSelector(state => state.date)
  const TOD = useSelector(state => state.tod)
  const State = useSelector(state => state.usState)
  const WaterType = useSelector(state => state.waterType)
  const WaterName = useSelector(state => state.waterName)
  const Weather = useSelector(state => state.weather)
  const Temp = useSelector(state => state.temp)
  const FishType = useSelector(state => state.fishType)
  const Species = useSelector(state => state.species)
  const Fly = useSelector(state => state.fly)
  const FlyType = useSelector(state => state.flyType)

  const saveCatch = async () => {
    await axios.post('/api/saveCatch', {
      Date: `${date}`,
      Time: `${TOD}`, 
      Location: `${WaterName} ${WaterType}, ${State}`,
      Weather: `${Temp} and ${Weather}`,
      Fish: `${Species} ${FishType}`,
      Fly: `${Fly} - ${FlyType}`
    })
  };

  return(
    <div>
      <h1>New Catch Review</h1>
      <h3>Date: {`${date}`}</h3>
      <h3>Time: {`${TOD}`}</h3> 
      <h3>Location: {`${WaterName} ${WaterType}, ${State}`}</h3> 
      <h3>Weather: {`${Temp} and ${Weather}`}</h3> 
      <h3>{`${Species} ${FishType}`}</h3> 
      <h3>{`${Fly} - ${FlyType}`}</h3>
      <div>
        {/* {(date && TOD && State && WaterType && WaterName && Weather && Temp && FishType && Species && Fly && FlyType) && */}
          <input className='btn btn-dark' type='button' value='Save Catch' onClick={saveCatch}/>
      </div>
    </div>
  )
};

export default ReviewCatch;