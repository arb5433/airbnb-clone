import React from 'react';
import {useParams} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import Map from '../GoogleMap';

import './SearchPage.css'

const SearchPage = () => {
  const {lat, lng} = useParams();

  const postings = useSelector(state => {
    return state.postings.shownPostings.map(postingId => state.postings[postingId]);
  })

  // console.log('----------- POSTINGS ----------------', postings)
// 
  return (
    <div className='search-page-wrapper'>
      <div className='search-page-postings-wrapper'>
        {postings && postings.map(postings => (
          <div>{postings.id}</div>
        ))}
      </div>
      <div className ='search-page-map'>
        <Map lat={lat} lng={lng}/>
      </div>
    </div>
  )
}

export default SearchPage