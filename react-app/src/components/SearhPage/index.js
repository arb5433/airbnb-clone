import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import Map from '../GoogleMap';
import PostingCard from '../PostingCard';
import AddFilters from '../FiltersModal';
import {removeFilter} from '../../store/filters';

import './SearchPage.css'

const SearchPage = ({isLoaded, loadError}) => {
  const {lat, lng} = useParams();
  const dispatch = useDispatch();

  const postings = useSelector(state => {
    return state.postings.shownPostings.map(postingId => state.postings[postingId]);
  })

  const filterTags = useSelector(state => {
    return state.filters.filters
  })

  const allTags = useSelector(state => {
    return state.filters.tagTypes
  })

  return (
    <div className='search-page-wrapper'>
      <div className='search-page-postings-wrapper'>
        <div className='search-page-posting-title-wrapper'>
          <div className='spp-title'>Potential postings in shown location</div>
        </div>
        <div className='top-filter-wrapper'>
          <div className='filter-and-options-wrapper'>
            {filterTags && Object.values(filterTags).map(tag => (
              <div key={tag.id} className='filter-div'>
                <div>{tag.type}</div>
                <button onClick={() => dispatch(removeFilter(tag.id))} className='filter-rmv-btn'>x</button>
              </div>
            ))}
          </div>
          <div className='selector-wrapper'>
              <AddFilters filterTags={filterTags} allTags={allTags}/>
          </div>
        </div>
        {postings && postings.map(postings => (
          <PostingCard posting={postings} key={postings.id}/>
        ))}
      </div>
      <div className ='search-page-map'>
        <Map lat={lat} lng={lng} isLoaded={isLoaded} loadError={loadError}/>
      </div>
    </div>
  )
}

export default SearchPage