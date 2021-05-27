import React from 'react'
import {NavLink} from 'react-router-dom';

import './PostingCard.css'

const PostingCard = ({posting}) => {

  return (
    <NavLink className='posting-card-wrapper' to={`/postings/${posting.id}`}>
      <div className='posting-card-image-wrapper' style={{backgroundImage:`url(${posting.mainImageUrl})`}}/>
      <div className='posting-info-wrapper'>
        <div className='posting-card-title'>{posting.title}</div>
        <div className='posting-card-basic-info'>{`${posting.numBeds} Beds, ${posting.numGuests} Guests, ${posting.numBathrooms} Baths`}</div>
        <div className='posting-card-price-wrapper'>
          <div className='posting-card-price'>{`$${posting.price} / night`}</div>
        </div>
      </div>
    </NavLink>
  )
}

export default PostingCard;