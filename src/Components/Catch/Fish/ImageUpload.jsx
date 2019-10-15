import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ImageUploader from 'react-images-upload'
import { storage } from '../../../Firebase/index'


const ImageUpload=()=>{
  const dispatch = useDispatch();
  const user = useSelector(state => state.user)

  const onDrop=async(image)=>{
    await dispatch({type: 'IMAGE', payload: image[0].name})
    handleUpload(image[0])
  };

  const handleUpload = (image)=>{
    const uploadTask = storage.ref(`images/${user.user_name}/${image.name}`).put(image)
    dispatch({type: 'IMAGE', payload: 'Loading...'})
    uploadTask.on('state_changed', 
    (snapshot) => {
      // progress
    },
    (error) => {
      console.log(error)
    }, 
    async () => {
      // complete
      await storage.ref(`images/${user.user_name}`).child(image.name).getDownloadURL().then(url => {
        dispatch({type: 'IMAGE', payload: url})
      })
    })
  };

  return (
    <div>
      <ImageUploader 
        withIcon={true} 
        buttonText='Choose image' 
        onChange={onDrop} 
        imgExtension={['.jpg', '.gif', '.png', '.gif']} 
        maxFileSize={5242880}
      />
    </div>
  )
}

export default ImageUpload;
