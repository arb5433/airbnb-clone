import React, {useState} from 'react';
import {useDispatch} from 'react-redux';


const EditPosting = ({setShowModal, posting}) => {

  const [title, setTitle] = useState(posting.title)
  const [description, setDescription] = useState(posting.description)

  return (
    <div>
       <div className='login-title-wrapper'>
        <button className='edt-and-del-btns exit-btn' onClick={() => setShowModal(false)}>X</button>
        <div className='login-title'>Update My Posting</div>
      </div>
      <form>
        <div>
          <div>Title</div>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <div>Description</div>
          <input value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <button className='edt-and-del-btns'>Update</button>
        </div>
      </form>
    </div>
  )
}

export default EditPosting;