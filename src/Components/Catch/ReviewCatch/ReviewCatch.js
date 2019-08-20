import React, { useState } from 'react';

function ReviewCatch(props){
  const { Date, TOD, State, WaterType, WaterName, Wheather, Temp, FishType, Species, Fly, FlyType } = props
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