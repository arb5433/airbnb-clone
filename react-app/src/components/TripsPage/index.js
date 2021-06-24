import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getPostings} from '../../store/posting';
import PostingCard from '../PostingCard';

import './TripsPage.css'


const TripsPage = () => {

  const dispatch = useDispatch()
  const [postingsArray, setPostingsArray] = useState('')
  const [page, setPage] = useState(0)
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
      console.log('inside the if')
      const array = bookings.map(booking => booking['postingId'])
      setPostingsArray(array)
    }
  },[bookings])


  useEffect(() => {
    if (postings[1] && postingsArray && load){
      console.log(postings)
      const array = postingsArray.map(index => postings[index])
      setRelativePostings(array)
    }
  },[postings, postingsArray])

console.log(postings)
console.log(relativePostings)

  return (
    <div className='trips-wrapper'>
      <h1 className='trips-title'>Trips</h1>
      <div className='trips-status-wrapper'>
        <div className='trips-status'>Upcoming</div>
        <div className='trips-status'>Past</div>
      </div>
      <div>
        <div>Above the card</div>
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

export default TripsPage;