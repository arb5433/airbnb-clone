import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {updateReview} from '../../store/reviews';

const ReviewEditForm = ({review, setShowModal}) => {

  const dispatch = useDispatch()

  const [newReview, setNewReview] = useState(review.review)
  const [newRating, setNewRating] = useState(review.rating)

  const reviewSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('rating', newRating)
    formData.append('review', newReview)
    dispatch(updateReview(formData, review.id))
    setShowModal(false)
  }

  return(
    <form className='review-form'>
      <textarea className='review-ta' placeholder='Leave a review for this property.' value={newReview} onChange={(e) => setNewReview(e.target.value)}/>
      <div className='form-rating-wrapper'>
        <div className='rating-rating'>Rating :  
          <input type='number' className='review-rating' value={newRating} onChange={(e) => setNewRating(e.target.value)}/>
        </div>
        <button className='review-btn' onClick={reviewSubmit}>Update Review</button>
      </div>
    </form>
  )
}

export default ReviewEditForm;