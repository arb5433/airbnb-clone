import React from 'react';
import {useDispatch} from 'react-redux';
import {addFilter} from '../../store/filters';

import './Filters.css'

const Filters = ({setShowModal, filterTags, allTags}) => {

  const dispatch = useDispatch();

  const onClick = (id) => {
    const newFilter = allTags[id]
    dispatch(addFilter(newFilter))
    setShowModal(false)
  }

  return (
    <div>
      <div className='login-title-wrapper'>
        <button className='edt-and-del-btns exit-btn' onClick={() => setShowModal(false)}>X</button>
        <div className='login-title'>Pick a New Filter</div>
      </div>
      <div className='filter-wrapper-for-options'>
        {allTags && Object.values(allTags).map(tag => (
          <button onClick={() => onClick(tag.id)} className='option-btn' key={tag.id} disabled={tag.id in filterTags}>{tag.type}</button>
        ))}
      </div>
    </div>
  )
}

export default Filters;