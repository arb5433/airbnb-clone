import React, {useEffect, useState} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import BookingCalendar from 'react-booking-calendar';
import {getPostings} from '../../store/posting';
import {loadingBookings, addingBooking} from '../../store/bookings';
import {getUserInfo, getBuildingInfo} from '../../store/info';
import {addingReview, deletingReview, loadingReviews} from '../../store/reviews';
import ReviewEditFormModal from '../ReviewEditModal';
import EditPostingModal from '../EditPostingModal';
import AddPhotoModal from '../AddPhotoModal';
import { refreshUser } from '../../store/session';

import './PostingPage.css'



const PostingPage = () => {

  const {id} = useParams()
  const dispatch = useDispatch()
  const history = useHistory()
  const [booked, setBooked] = useState([])
  const [bookedDates, setBookedDates] = useState([])
  const [bookDate, setBookDate] = useState('')
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState('')
  const [days, setDays] = useState(0)
  const [bookingDates, setBookingDates] = useState([])
  const [totalRating, setTotalRating] = useState('Not yet');

  
  const postings = useSelector(state => {
    return state.postings;
  })
  const posting = postings[id]
  
  
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
  
  const tomorrow = (date) => {
    const day = new Date(date.valueOf());
    // console.log('*****TOMORROW _ DAY *****************', day)
    day.setDate(day.getDate() + 1);
    // console.log('****** TOMORROW _ TOMORROW *********', day)
    const year = day.getFullYear()
    let month = day.getMonth() + 1;
    // console.log("*********** MONTH ***************", month)
    let newDate = day.getDate()
    if (String(month).length === 1) month = '0' + month
    // console.log("*********** MONTH ***************", month)
    if (String(newDate).length === 1) newDate = '0' + newDate
    return `${year}-${month}-${newDate}`
  }

  const intersection = (bookings, booked) => {
    return bookings.filter(date => booked.includes(date))
  }

  useEffect(() => {
    dispatch(getPostings())
  }, [])
  
  useEffect(() => {
    if(posting){
      dispatch(getUserInfo(posting.userId))
      dispatch(getBuildingInfo(posting.buildingType))
      dispatch(loadingBookings(posting.id))
      dispatch(loadingReviews(posting.id))
    }
  },[dispatch, posting])
  
  useEffect(() => {
    if (bookings){
      const formattedBookings = [];
      const newBookings = Object.values(bookings)
      newBookings.forEach(booking => {
        formattedBookings.push(booking.date)
      })
      setBooked(formattedBookings)
      const bookingDatesReal = []
      formattedBookings.forEach(booking => {
        bookingDatesReal.push(new Date(booking+'T00:00:01'))
      })
      setBookedDates(bookingDatesReal)
    }
  },[dispatch, bookings])

  useEffect(() => {
    if (days && bookDate){
      const bookings = [bookDate]
      let dayCount = days
      while (dayCount > 1){
        const dayBefore = new Date(bookings[bookings.length - 1]+'T00:00:01')
        console.log('******DATE************', dayBefore)
        const nextDay = tomorrow(dayBefore)
        console.log('*******TOMORROW***********', nextDay)
        bookings.push(nextDay)
        dayCount -= 1
      }
      console.log(bookings, '+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_**')
      console.log('********* booked **********', booked)
      setBookingDates(bookings)
      const intersection = bookings.filter(date => booked.includes(date))
      console.log('***** INTER *********', intersection)
      
    }
  }, [days, bookDate])

  useEffect(() => {
    if (reviews){
      let total = 0;
      let count = 0;
      // console.log(reviews)
      Object.values(reviews).forEach(review => {
        total += review.rating;
        count++;
      });
      const newRating = total > 1 ? total/count : 0;
      const rounded = Math.round(newRating * 10) / 10
      if(rounded > 0){
        setTotalRating(rounded);
      }
    }
  }, [reviews])
  
  const bookSubmit = (e) => {
    e.preventDefault()
    if(!user){
      alert('Please log in to book a property')
    } else {
      bookingDates.forEach(date => {
        const formData = new FormData
        formData.append('date', date)
        formData.append('userId', user.id)
        formData.append('postingId', id)
        dispatch(addingBooking(formData))
      })
    }
    setDays(0)
    setBookDate('')
  }

  const reviewSubmit = (e) => {
    e.preventDefault()
    if(!user){
      alert('Please log in to review a property')
    } else {
      const formData = new FormData
      formData.append('userId', user.id)
      formData.append('postingId', id)
      formData.append('rating', rating)
      formData.append('review', review)
      dispatch(addingReview(formData))
    }
  }

  const reviewDelete = (review) => {
    dispatch(deletingReview(review.id))
  }

  const postingDelete = async (e) => {
    const res = await fetch(`/api/postings/${id}`, {
      method: 'DELETE'
    })
    dispatch(getPostings())
    dispatch(refreshUser(user.id))
    history.push('/')
  }


  return (
    <>
      {posting && (
        <div className='postings-page-wrapper'>
          <div className='postings-page-intro'>{`Posting located in ${posting.city}`}</div>
          <div className='posting-page-images-wrapper'>
            <div className='posting-page-main-image-div' style={{backgroundImage:`url(${posting.mainImageUrl})`}}/>
            {posting.images[0] && <div className='posting-page-other-image-1' style={{backgroundImage:`url(${posting.images[0].imageUrl})`}}/>}
            {posting.images[0] === undefined && <div className='posting-page-other-image-1'/>}
            {posting.images[1] && <div className='posting-page-other-image-2' style={{backgroundImage:`url(${posting.images[1].imageUrl})`}}/>}
            {posting.images[1] === undefined && <div className='posting-page-other-image-2'/>}
            {posting.images[2] && <div className='posting-page-other-image-3' style={{backgroundImage:`url(${posting.images[2].imageUrl})`}}/>}
            {posting.images[2] === undefined && <div className='posting-page-other-image-3'/>}
            {posting.images[3] && <div className='posting-page-other-image-4' style={{backgroundImage:`url(${posting.images[3].imageUrl})`}}/>}
            {posting.images[3] === undefined && <div className='posting-page-other-image-4'/>}
          </div>
          <div className='posting-page-information-wrapper'>
            <div className='posting-page-title-and-host-wrapper'>
              {user && host.id === user.id && (
                <div className='host-post-buttons'>
                  <AddPhotoModal posting={posting}/>
                  <EditPostingModal posting={posting}/>
                  <button className='edt-and-del-btns' onClick={postingDelete}>Delete Posting</button>
                </div>
              )}
              {host && <div className='posting-page-host'>{`${totalRating} rated ${building.type} hosted by ${host.username}`}</div>}
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
                  <div className='booking-div'>Starting Date :
                    <input className='booking-input' type='date' value={bookDate} onChange={(e) => setBookDate(e.target.value)}/>
                  </div>
                  <div className='booking-div'>Number of Days :
                    <input className='booking-input' type='number' value={days} onChange={(e) => setDays(e.target.value)}/>
                  </div>
                  <div className='booking-btn-wrapper'>
                    <button className='book-btn' onClick ={bookSubmit} disabled={!user || intersection(bookingDates, booked).length > 0}>Book</button>
                  </div>
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
                    {user && user.id == review.userId && (
                      <div>
                        <ReviewEditFormModal review={review}/>
                        <button className='edt-and-del-btns' onClick={() => reviewDelete(review)} >Delete</button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            {user && <form className='review-form'>
              <textarea className='review-ta' placeholder='Leave a review for this property.' value={review} onChange={(e) => setReview(e.target.value)}/>
              <div className='form-rating-wrapper'>
                <div className='rating-rating'>Rating :  
                  <input type='number' className='review-rating' value={rating} onChange={(e) => setRating(e.target.value)}/>
                </div>
                <button className='review-btn' onClick={reviewSubmit}>Post Review</button>
              </div>
            </form>}
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