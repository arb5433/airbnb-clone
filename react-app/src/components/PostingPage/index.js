import React from 'react';
import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';



const PostingPage = () => {

  const {id} = useParams()
  const postings = useSelector(state => {
    return state.postings;
  })
  const posting = postings[id]
  return (
    <>
      {posting && (
        <div className='postings-page-wrapper'>
          <div className='postings-page-intro'>{`Posting located in ${posting.city}`}</div>
          <div className='posting-page-images-wrapper'>
            <div className='posting-page-main-image-div'/>
            <div className='posting-page-other-images-wrapper'>
              <div className='posting-page-other-image-1'/>
              <div className='posting-page-other-image-2'/>
              <div className='posting-page-other-image-3'/>
              <div className='posting-page-other-image-4'/>
            </div>
          </div>
          <div className='posting-page-information-wrapper'>
            <div className='posting-page-title-and-host-wrapper'>
              <div className='posting-page-title'></div>
              <div className='posting-page-host'></div>
            </div>
            <div className='poasting-page-description-and-details-wrapper'>
              <div className='posting-page-description'></div>
              <div className='posting-page-details'></div>
            </div>
            <div className='posting-page-price-and-booking-wrapper'></div>
            <div className='posting-page-availability-calendar'></div>
          </div>
          <div className='posting-page-posting-reviews-wrapper'></div>
        </div>
      )}
    </>
  )
}

export default PostingPage;