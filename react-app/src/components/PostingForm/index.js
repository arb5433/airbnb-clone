import React, {useState} from 'react';
import {useSelector} from 'react-redux';

import './PostingForm.css'

const PostingForm = () => {

  const [page, setPage] = useState(0);
  const [address, setAddress] = useState('')


  const user = useSelector(state => {
    return state.session.user;
  });

  const onSubmitOne = (e) => {
    e.preventDefault()
    setPage(1)
  }

  return (
    <div className='posting-form-wrapper'>
      {page===0 && (
        <div className='form-wrapper'>
          <div className='right-form'>
            <div className='form-title'>{`Hi, ${user.username}! Let's get started listing your property.`}</div>
            <div className='form-step'>Step 1</div>
            <div className='form-question'>Where is your property located?</div>
            <form className='location-form' onSubmit={onSubmitOne}>
              <input className='location-input' value={address} onChange={(e) => setAddress(e.target.value)} placeholder='Property Address'/>
              <button className='continue-btn'>Continue</button>
            </form>
          </div>
          <div className='left-form'>
            <div className='location-form-image'/>
          </div>
        </div>
      )}
      
    </div>
  )
}

export default PostingForm