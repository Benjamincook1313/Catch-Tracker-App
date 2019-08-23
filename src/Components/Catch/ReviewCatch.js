import React from 'react';
import { useSelector } from 'react-redux';

function ReviewCatch(){
  const Date = useSelector(state => state.date)
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
  return(
    <div>
      {`${Date}, ${TOD}, ${State}, ${WaterType}, ${WaterName}, ${Wheather}, ${Temp}, ${FishType}, ${Species}, ${Fly}, ${FlyType}`}
      
      {(Date && TOD && State && WaterType && WaterName && Wheather && Temp && FishType && Species && Fly && FlyType) &&
        <div>
          <h1>New Catch Info Review</h1>
          <button>Save Catch</button>
        </div>
      }
    </div>
  )
};

export default ReviewCatch;