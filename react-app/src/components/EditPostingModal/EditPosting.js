import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {updatePosting} from '../../store/posting';

import './EditPosting.css';


const EditPosting = ({setShowModal, posting}) => {

  const dispatch = useDispatch()

  const [title, setTitle] = useState(posting.title)
  const [description, setDescription] = useState(posting.description)

  const onClick = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    dispatch(updatePosting(formData, posting.id))
    setShowModal(false)
  }

  return (
    <div className='edit-posting-modal-wrapper'>
       <div className='login-title-wrapper'>
        <button className='edt-and-del-btns exit-btn' onClick={() => setShowModal(false)}>X</button>
        <div className='login-title'>Update My Posting</div>
      </div>
      <div className='edit-posting-information'>In order to keep agreements valid and fair, any important information such as price and address must be changed upon creation of a new posting. Only changes to title and description are available after creation.</div>
      <form>
        <div className='general-input-modal-wrapper'>
          <div className='general-input-modal-title'>Title</div>
          <input className='general-input-modal' value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className='general-input-modal-wrapper'>
          <div className='general-input-modal-title'>Description</div>
          <textarea className='general-textarea-modal' value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className='general-btn-modal-wrapper'>
          <button className='edt-and-del-btns' onClick={onClick}>Update</button>
        </div>
      </form>
    </div>
  )
}

export default EditPosting;