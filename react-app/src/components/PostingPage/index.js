import React, {useEffect, useState} from 'react';
import {Redirect, useParams} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import BookingCalendar from 'react-booking-calendar';
import {getPostings} from '../../store/posting';
import bookingReducer, {loadingBookings, addingBooking, removingBooking} from '../../store/bookings';
import {getUserInfo, getBuildingInfo} from '../../store/info';

import './PostingPage.css'

const PostingPage = () => {

  const {id} = useParams()
  const dispatch = useDispatch()
  const [booked, setBooked] = useState([])

  // const date = new Date();
  // const year = date.getFullYear()
  // const thisMonth = date.getMonth()
  // const today = date.getDate()
  // const min = new Date(year, thisMonth, today)
  // const max = new Date(year, thisMonth + 6, today)


  useEffect(() => {
    dispatch(getPostings())
  }, [])

  const postings = useSelector(state => {
    return state.postings;
  })
  const posting = postings[id]
  console.log(posting)

  useEffect(() => {
    if(posting){
      dispatch(getUserInfo(posting.userId))
      dispatch(getBuildingInfo(posting.buildingType))
      dispatch(loadingBookings(posting.id))
    }
  },[dispatch, posting])

  const host = useSelector(state => {
    return state.info.user
  })

  const building = useSelector(state => {
    return state.info.building
  })

  const bookings = useSelector(state => {
    return state.bookings
  })

  useEffect(() => {
    if (bookings){
      const formattedBookings = []
      const newBookings = Object.values(bookings)
      newBookings.forEach(booking => {
        formattedBookings.push(booking.date)
      })
      console.log(formattedBookings)
      setBooked(formattedBookings)
    }
  },[dispatch, bookings])


  return (
    <>
      {posting && (
        <div className='postings-page-wrapper'>
          <div className='postings-page-intro'>{`Posting located in ${posting.city}`}</div>
          <div className='posting-page-images-wrapper'>
            <div className='posting-page-main-image-div' style={{backgroundImage:`url(${posting.mainImageUrl})`}}/>
            <div className='posting-page-other-image-1'/>
            <div className='posting-page-other-image-2'/>
            <div className='posting-page-other-image-3'/>
            <div className='posting-page-other-image-4'/>
          </div>
          <div className='posting-page-information-wrapper'>
            <div className='posting-page-title-and-host-wrapper'>
              {host && <div className='posting-page-host'>{`${building.type} hosted by ${host.username}`}</div>}
              <div className='posting-page-details'>{`${posting.numBeds} Beds, ${posting.numGuests} Guests, ${posting.numBathrooms} Baths`}</div>
              <div className='posting-page-title'>{posting.title}</div>
            </div>
            <div className='poasting-page-description-and-details-wrapper'>
              <div className='posting-page-description'>{posting.description}</div>
            </div>
            <div className='posting-page-price-and-booking-wrapper'>
              <BookingCalendar bookings={booked}/>
            </div>
            <div className='posting-page-availability-calendar'></div>
          </div>
          <div className='posting-page-posting-reviews-wrapper'></div>
        </div>
      )}
    </>
  )
}

export default PostingPage;