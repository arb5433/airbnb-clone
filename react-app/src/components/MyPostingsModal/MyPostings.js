import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {refreshUser} from '../../store/session';
import {removePosting} from '../../store/posting';

const MyPostings = ({setShowModal}) => {

  const dispatch = useDispatch()
  
  const user = useSelector(state => {
    return state.session.user
  })

  const deleteClick = async (posting) => {
    const res = await fetch(`/api/postings/${posting.id}`, {
      method: 'DELETE'
    })
    dispatch(refreshUser(user.id))
    dispatch(removePosting(posting.id))
  }

  return (
    <div className='my-bookings-wrapper'>
      <div className='login-title-wrapper'>
        <button className='edt-and-del-btns exit-btn' onClick={() => setShowModal(false)}>X</button>
        <div className='login-title'>My Postings</div>
      </div>
      {user && user.postings.map(posting => (
        <div className='each-booking-wrapper' key={posting.id}>
          <NavLink className='booking-link-to' to={`/postings/${posting.id}`}>
            <div>{posting.address}</div>
            <div>{`$${posting.price} / Night`}</div>
          </NavLink>
          <div className='my-booking-delete-wrapper'>
            <button className='edt-and-del-btns' onClick={() => deleteClick(posting)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MyPostings;