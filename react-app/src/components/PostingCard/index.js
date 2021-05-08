import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux';

import './PostingCard.css'

const PostingCard = ({posting}) => {

  const [type, setType] = useState('');
  const [buildingType, setBuildingType] = useState(0)

  const buildingTypes = useSelector(state => {
    return state.postings.buildingTypes;
  })


  return (
    <div className='posting-card-wrapper'>
      <img className='posting-card-image' src={posting.mainImageUrl}/>
      <div className='posting-info-wrapper'>
        <div className='posting-card-title'>{posting.title}</div>
        <div className='posting-card-basic-info'>{`${posting.numBeds} Beds, ${posting.numGuests} Guests, ${posting.numBathrooms} Baths`}</div>
        <div className='posting-card-price-wrapper'>
          <div className='posting-card-price'>{`$${posting.price} / night`}</div>
        </div>
      </div>
    </div>
  )
}

export default PostingCard;