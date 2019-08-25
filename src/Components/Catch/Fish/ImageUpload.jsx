import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ImageUploader from 'react-images-upload'
import { storage } from '../../../Firebase/index'


const ImageUpload=()=>{
  const [Image, setImage] = useState('');
  const [ImageName, setImageName] = useState('');
  const UploadedImage = useSelector(state => state.Image)
  const dispatch = useDispatch();

  const onDrop=(image)=>{
    setImage(image[0])
    setImageName(image[0].name)
  };

  const handleUpload=()=>{
    const uploadTask = storage.ref(`images/${ImageName}`).put(Image)
    uploadTask.on('state_changed', 
    (snapshot) => {
      // progress
    },
    (error) => {
      console.log(error)
    }, () => {
      // complete
      storage.ref('images').child(Image.name).getDownloadURL().then(url => {
        dispatch({type: 'IMAGE', payload: url})
        setImage('')
        setImageName('')
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
      {/* <input type='file' onChange={e => onDrop(e.target.files)} /> */}
      {ImageName} {Image && <input type='submit' value='Upload' onClick={handleUpload}/>}
      {/* {Image && <div>{ImageName}<button onClick={handleUpload}>Upload</button></div>} */}
      <img src={UploadedImage} alt='' height='200' />
    </div>
  )
}

export default ImageUpload;
