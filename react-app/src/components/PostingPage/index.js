import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import BookingCalendar from 'react-booking-calendar';
import {getPostings} from '../../store/posting';
import {loadingBookings, addingBooking} from '../../store/bookings';
import {getUserInfo, getBuildingInfo} from '../../store/info';
import {addingReview, deletingReview, loadingReviews} from '../../store/reviews';
import ReviewEditFormModal from '../ReviewEditModal';

import './PostingPage.css'


const PostingPage = () => {

  const {id} = useParams()
  const dispatch = useDispatch()
  const [booked, setBooked] = useState([])
  const [bookedDates, setBookedDates] = useState([])
  const [bookDate, setBookDate] = useState('')
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState('')

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
      dispatch(loadingReviews(posting.id))
    }
  },[dispatch, posting])

  const user = useSelector(state => {
    return state.session.user
  })

  const host = useSelector(state => {
    return state.info.user
  })

  const building = useSelector(state => {
    return state.info.building
  })

  const bookings = useSelector(state => {
    return state.bookings
  })

  const reviews = useSelector(state => {
    return state.reviews
  })

  let reviewsArray;
  if(reviews){
    reviewsArray = Object.values(reviews)
  }

  useEffect(() => {
    if (bookings){
      const formattedBookings = []
      const newBookings = Object.values(bookings)
      newBookings.forEach(booking => {
        formattedBookings.push(booking.date)
      })
      // console.log(formattedBookings)
      setBooked(formattedBookings)
      const bookingDatesReal = []
      formattedBookings.forEach(booking => {
        bookingDatesReal.push(new Date(booking+'T00:00:00'))
      })
      // console.log(bookingDatesReal, '***********REAL***********')
      setBookedDates(bookingDatesReal)
    }
  },[dispatch, bookings])

  // console.log(bookDate, '-9-9-9-9-9-9', typeof(bookDate))
  // console.log(booked)
  // console.log(booked.includes(bookDate))
  // console.log(new Date(bookDate))
  console.log(reviews, '-------------r-r-r-r-r---------')
  
  const bookSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData
    formData.append('date', bookDate)
    formData.append('userId', user.id)
    formData.append('postingId', id)
    dispatch(addingBooking(formData))
    // alert('Your night has been booked!')
  }

  const reviewSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData
    formData.append('userId', user.id)
    formData.append('postingId', id)
    formData.append('rating', rating)
    formData.append('review', review)
    dispatch(addingReview(formData))
  }

  const reviewDelete = (review) => {
    console.log(review)
    console.log(review.id)
    dispatch(deletingReview(review.id))
  }

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
              <BookingCalendar bookings={bookedDates}/>
              <div className='booking-form'>
                <div className='booking-title'>Book a stay at this property</div>
                <div className='booking-price'>{`$${posting.price} / night`}</div>
                <form className='real-booking-form'>
                  <input type='date' value={bookDate} onChange={(e) => setBookDate(e.target.value)}/>
                  <button className='book-btn' onClick ={bookSubmit} disabled={booked.includes(bookDate)}>Book</button>
                </form>
              </div>
            </div>
          </div>
          <div className='posting-page-posting-reviews-wrapper'>
            <div className='posting-reviews-title'>Reviews associated with this posting:</div>
              {reviewsArray && reviewsArray.map(review => (
                <div className='review-wrapper' key={review.id}>
                  <div className='review-review'>{`"${review.review}"`}</div>
                  <div className='rating-wrapper'>
                    <div className='rating'>{`Rating : ${review.rating}/5`}</div>
                    {user.id == review.userId && (
                      <div>
                        <ReviewEditFormModal review={review}/>
                        <button className='edt-and-del-btns' onClick={(e) => reviewDelete(review)} >Delete</button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            <form className='review-form'>
              <textarea className='review-ta' placeholder='Leave a review for this property.' value={review} onChange={(e) => setReview(e.target.value)}/>
              <div className='form-rating-wrapper'>
                <div className='rating-rating'>Rating :  
                  <input type='number' className='review-rating' value={rating} onChange={(e) => setRating(e.target.value)}/>
                </div>
                <button className='review-btn' onClick={reviewSubmit}>Post Review</button>
              </div>
            </form>
          </div>
          <div className='footer'>
            <a className='dev-name' href='https://github.com/arb5433/airbnb-clone/wiki'>ThereBnB Wiki</a>
            <div className='dev-name'>Created By: Adam Bailey</div>
            <a className='dev-name' href='https://github.com/arb5433'>Github Profile</a>
          </div>
        </div>
      )}
    </>
  )
}

export default PostingPage;