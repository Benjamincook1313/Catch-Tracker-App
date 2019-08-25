import React from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

function ReviewCatch(){
  const date = useSelector(state => state.date)
  const TOD = useSelector(state => state.tod)
  const State = useSelector(state => state.usState)
  const WaterType = useSelector(state => state.waterType)
  const WaterName = useSelector(state => state.waterName)
  const Wheather = useSelector(state => state.wheather)
  const Temp = useSelector(state => state.temp)
  const FishType = useSelector(state => state.fishType)
  const Species = useSelector(state => state.species)
  const Fly = useSelector(state => state.fly)
  const FlyType = useSelector(state => state.flyType)

  const saveCatch = async () => {
    await axios.post('/api/saveCatch', {
      Date: `${date? date+',': today()}`,
      Time: `${TOD? TOD+',': ''}`, 
      Location: `${WaterName} ${WaterType}, ${State}`,
      Wheather: `${Temp} and ${Wheather}`,
      Fish: `${Species} ${FishType}`,
      Fly: `${Fly} - ${FlyType}`
    })
  }

  const today = () => {
    let month = new Date().getMonth()+1
    let day = new Date().getDate()
    let year = new Date().getFullYear()
    switch(month){
      case 1:
        return `Jan ${day}, ${year}`
      case 2:
        return `Feb ${day}, ${year}`
      case 3:
        return `Mar ${day}, ${year}`
      case 4:
        return `Apr ${day}, ${year}`
      case 5:
        return `May ${day}, ${year}`
      case 6:
        return `June ${day}, ${year}`
      case 7:
        return `July ${day}, ${year}`
      case 8:
        return `Aug ${day}, ${year}`
      case 9:
        return `Sept ${day}, ${year}`
      case 10:
        return `Oct ${day}, ${year}`
      case 11:
        return `Nov ${day}, ${year}`
      case 12:
        return `Dec ${day}, ${year}`
      default:
        return ''
    }
  };

  return(
    <div>
      <h1>New Catch Review</h1>
      <h3>Date: {`${date? date: today()}`}</h3>
      <h3>Time: {`${TOD? TOD: 'none'}`}</h3> 
      <h3>Location: {`${WaterName} ${WaterType}, ${State}`}</h3> 
      <h3>Wheather: {`${Wheather} and ${Temp}`}</h3> 
      <h3>{`${Species} ${FishType}`}</h3> 
      <h3>{`${Fly} - ${FlyType}`}</h3>
      <div>
        {(date&&TOD&&State&&WaterType&&WaterName&&Wheather&&Temp&&FishType&&Species&&Fly&&FlyType) &&
          <input type='button' value='Save Catch' onClick={saveCatch}/>
        }
      </div>
    </div>
  )
};

export default ReviewCatch;