import React, { useState, Fragment } from 'react'
import ImageUploader from 'react-images-upload'
import axios from 'axios';


const ImageUpload = (e) => {
  const [Image, setImage] = useState('');
  const [ImageName, setImageName] = useState('');
  const [UploadedImage, setUploadedImage] = useState({})

  const onDrop=(e)=>{
    setImage(e.target.files[0])
    setImageName(e.target.files[0].name)
  };

  const onSubmit=()=>{
    const data = new FormData();
    data.append('image', Image)

    const res = axios.post('/upload', data, {})
    .then(res => console.log(res.statusText))
    .catch(err => console.log(err, {message: 'upload didnt work'}))

  };

  return (
    <div>
      <div>
        <input type='file' onChange={onDrop} />
        <button onClick={onSubmit}>Submit</button>
      </div>
    </div>
  )
}

export default ImageUpload;
