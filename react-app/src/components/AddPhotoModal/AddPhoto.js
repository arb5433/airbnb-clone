import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {getPostings} from '../../store/posting';

import './AddPhoto.css'


const AddPhoto = ({setShowModal, posting}) => {

  const [image, setImage] = useState('')
  const dispatch = useDispatch()

  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  }

  const onClick = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('image', image)
    formData.append('postingId', posting.id)
    const res = await fetch('/api/postings/photo', {
      method : 'POST',
      body : formData
    })
    dispatch(getPostings())
    setShowModal(false)
  }

return (
  <div className='add-photo-wrapper'>
    <div className='login-title-wrapper'>
      <button className='edt-and-del-btns exit-btn' onClick={() => setShowModal(false)}>X</button>
      <div className='login-title'>Add Photo</div>
    </div>
    <form className='add-photo-form'>
      <input className='add-image-input' type='file' accept='image/*' onChange={updateImage}/>
      <button className='upload-btn' onClick={onClick}>Upload Image</button>
    </form>
  </div>
)
}

export default AddPhoto;