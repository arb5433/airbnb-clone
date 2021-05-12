import React from 'react';
import {useParams} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import Map from '../GoogleMap';
import PostingCard from '../PostingCard';

import './SearchPage.css'

const SearchPage = () => {
  const {lat, lng} = useParams();

  const postings = useSelector(state => {
    return state.postings.shownPostings.map(postingId => state.postings[postingId]);
  })

  return (
    <div className='search-page-wrapper'>
      <div className='search-page-postings-wrapper'>
        <div className='search-page-posting-title-wrapper'>
          <div className='spp-title'>Potential postings in shown location</div>
        </div>
        {postings && postings.map(postings => (
          <PostingCard posting={postings} key={postings.id}/>
        ))}
      </div>
      <div className ='search-page-map'>
        <Map lat={lat} lng={lng}/>
      </div>
    </div>
  )
}

export default SearchPage