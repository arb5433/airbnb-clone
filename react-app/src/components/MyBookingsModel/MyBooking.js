 import React, { useEffect } from 'react';
 import {useDispatch, useSelector} from 'react-redux';
 import {NavLink} from 'react-router-dom';
 import {refreshUser} from '../../store/session';

 import './MyBookings.css'


 const MyBooking = ({setShowModal}) => {

  const dispatch = useDispatch()

  const user = useSelector(state => {
    return state.session.user
  })

  useEffect(() => {
    dispatch(refreshUser(user.id))
  }, [dispatch, user.id])

  const deleteClick = async (booking) => {
    await fetch(`/api/bookings/${booking.id}`, {
      method: 'DELETE'
    })
    dispatch(refreshUser(user.id))
  }

   return (
     <div className='my-bookings-wrapper'>
      <div className='login-title-wrapper'>
        <button className='edt-and-del-btns exit-btn' onClick={() => setShowModal(false)}>X</button>
        <div className='login-title'>My Bookings</div>
      </div>
       {user && user.bookings.map(booking => (
         <div className='each-booking-wrapper' key={booking.id}>
           <div className='booking-link-wrapper'>
            <div>{`${booking.date} : `}</div>
            <NavLink className='booking-link-to' to={`/postings/${booking.postingId}`}>View Posting</NavLink>
           </div>
           <div className='my-booking-delete-wrapper'>
            <button className='edt-and-del-btns' onClick={() => deleteClick(booking)}>Delete</button>
           </div>
         </div>
       ))}
     </div>
   )
 }

 export default MyBooking;