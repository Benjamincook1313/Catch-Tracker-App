import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ImageUploader from 'react-images-upload'
import { storage } from '../../../Firebase/index'


const ImageUpload=()=>{
  const dispatch = useDispatch();
  const user = useSelector(state => state.user)
  
  const [Image, setImage] = useState('');
  const [UploadedImage, setUploadedImage] = useState('')

  const onDrop=(image)=>{
    setImage(image[0])
    dispatch({type: 'IMAGE', payload: image[0].name})
  };

  const handleUpload=()=>{
    const uploadTask = storage.ref(`images/${user.user_name}/${Image.name}`).put(Image)
    uploadTask.on('state_changed', 
    (snapshot) => {
      // progress
    },
    (error) => {
      console.log(error)
    }, () => {
      // complete
      storage.ref(`images/${user.user_name}`).child(Image.name).getDownloadURL().then(url => {
        setUploadedImage(url)
        setImage('')
      })
    })
  };

  // const style = {

  // }

  return (
    <div>
      <ImageUploader 
        withIcon={true} 
        buttonText='Choose image' 
        onChange={onDrop} 
        imgExtension={['.jpg', '.gif', '.png', '.gif']} 
        maxFileSize={5242880}
      />
      {Image.name && 
        <div>
          {Image.name}
          <button onClick={handleUpload}>Upload</button>
        </div>
      }
      <div><img src={UploadedImage} alt='' height='200' /></div>
    </div>
  )
}

export default ImageUpload;
