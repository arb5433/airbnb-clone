import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getPostings} from '../../store/posting';
import PostingCard from '../PostingCard';

import './TripsPage.css'


const TripsPage = () => {

  const dispatch = useDispatch()
  const [postingsArray, setPostingsArray] = useState('')
  const [relativePostings, setRelativePostings] = useState('')
  const [load, setLoad] = useState(false)
  
  useEffect(() => {
    dispatch(getPostings())
    setLoad(true)
  },[dispatch])

  const bookings = useSelector(state => {
    return state.session.user.bookings
  })

  const postings = useSelector(state => {
    return state.postings
  })

  useEffect(() => {
    if (bookings) {
      const array = bookings.map(booking => booking['postingId'])
      setPostingsArray(array)
    }
  },[bookings])


  useEffect(() => {
    if (postings[1] && postingsArray && load){
      const array = postingsArray.map(index => postings[index])
      setRelativePostings(array)
    }
  },[postings, postingsArray])

  return (
    <div className='trips-wrapper'>
      <h1 className='trips-title'>Trips</h1>
      <div className='trips-status-wrapper'>
        <div className='trips-status first-status' active={true}>Upcoming</div>
        <div className='trips-status'>Past</div>
      </div>
      <div>
        <div>When you are ready to start planning your next trip, we're here to help.</div>
        {relativePostings && relativePostings.map(posting => ( 
          <div>
            <PostingCard key={posting.id} posting={posting}/>
            <div>NewPosting, {posting.id}</div>
          </div>

        ))}
      </div>
      <button>Explore ThereBnB</button>
    </div>
  )
}

// look into making two pages and using the target pysdo class, changing the url at the end to show which page it is on.

export default TripsPage;