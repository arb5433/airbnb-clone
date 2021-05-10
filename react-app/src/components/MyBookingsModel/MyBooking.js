 import React from 'react';
 import {useDispatch, useSelector} from 'react-redux';
 import {refreshUser} from '../../store/session';


 const MyBooking = () => {

  const dispatch = useDispatch()

  const user = useSelector(state => {
    return state.session.user
  })

  const deleteClick = async (booking) => {
    const res = await fetch(`/api/bookings/${booking.id}`, {
      method: 'DELETE'
    })
    dispatch(refreshUser(user.id))
  }

   return (
     <div>
       {user && user.bookings.map(booking => (
         <div key={booking.id}>
           <div>{`Booking : ${booking.date}`}</div>
           <button className='edt-and-del-btns' onClick={() => deleteClick(booking)}>Delete</button>
         </div>
       ))}
     </div>
   )
 }

 export default MyBooking;