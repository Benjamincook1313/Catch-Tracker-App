import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { storage } from '../../../Firebase/index' 
import { Button } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';

function ReviewCatch(){
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const date = useSelector(state => state.day)
  const TOD = useSelector(state => state.tod)
  const State = useSelector(state => state.usState)
  const WaterType = useSelector(state => state.waterType)
  const WaterName = useSelector(state => state.waterName)
  const Weather = useSelector(state => state.weather)
  const Temp = useSelector(state => state.temp)
  const ImageName = useSelector(state => state.image)
  const FishType = useSelector(state => state.fishType)
  const Species = useSelector(state => state.species)
  const Fly = useSelector(state => state.fly)
  const FlyType = useSelector(state => state.flyType)
  const Size = useSelector(state => state.size)

  const [image, setImage] = useState('')
  const [comment, setComment] = useState('')

  useEffect(() => {
    if(ImageName){storage.ref(`images/${user.user_name}`).child(ImageName).getDownloadURL().then(url => {
        setImage(url)
      })
    }
  });
  
  const saveCatch = async () => {
    let Location = `${WaterName} ${WaterType}, ${State}`
    let weather = `${Temp} and ${Weather}`
    let Fish = `${Species} ${FishType}`
    let fly = `size ${Size}, ${Fly} - ${FlyType}`
    let userName = `${user.user_name}`
    const res = await axios.post('/api/saveCatch', {userName, date, TOD, Location, weather, ImageName, Fish, fly})
    if(res.data){
      dispatch({type: 'CLEAR_CATCH'})
      Swal.fire({type: 'success', title: 'Success', showConfirmButton: false, timer: 3000})
    }
  };

  return(
    <div>
      <h1>New Catch Review</h1>
      <h5><div>{`${TOD} ${date}`}</div>  <div>{`${Temp}-${Weather}`}</div></h5>
      <h2>{`${Species} ${FishType}`}</h2> 
      <img src={image} alt='' height='500' />
      <h3>{`${WaterName} ${WaterType}, ${State}`}</h3> 
      <h4>{`size ${Size}, ${Fly} - ${FlyType}`}</h4>
      <p>{comment}</p>
      Comments: <input type='text' value={comment} onChange={e => setComment(e.target.value)} />
      <div>
          <Button variant='dark' onClick={() => dispatch({type: 'BACK'})}>{'< Back'}</Button>
          <Button variant='dark' onClick={saveCatch}>save catch</Button>
      </div>
    </div>
  )
};

export default ReviewCatch;