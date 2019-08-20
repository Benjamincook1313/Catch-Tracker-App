import React, { useState } from 'react'
import ImageUploader from 'react-images-upload'
import { storage } from '../../../Firebase'


const ImageUpload=(props)=>{
  const [Image, setImage] = useState('');
  const [ImageName, setImageName] = useState('');
  const [UploadedImage, setUploadedImage] = useState('')

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
        setUploadedImage(url)
      })
    })
  };

  // const style = {

  // }

  return (
    <div>
      <ImageUploader withIcon={true} buttonText='Choose image' onChange={onDrop} imgExtension={['.jpg', '.gif', '.png', '.gif']} maxFileSize={5242880}/>
      {/* <input type='file' onChange={e => onDrop(e.target.files)} />
      <input type='submit' value='Upload' onClick={handleUpload} /> */}
      {/* {Image && <div>{ImageName}<button onClick={handleUpload}>Upload</button></div>} */}
      <img src={UploadedImage} alt='' height='200' />
      {/* <div className="card" style={{width: '18rem'}}>
        <img className="card-img-top" src={UploadedImage} alt=''/>
        <div className="card-body">
          <p className="card-text">{ImageName}</p>
        </div>
      </div> */}
    </div>
  )
}

export default ImageUpload;
