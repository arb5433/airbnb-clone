import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {refreshUser} from '../../store/session';

const MyPostings = () => {

  const dispatch = useDispatch()
  
  const user = useSelector(state => {
    return state.session.user
  })

  const deleteClick = async (posting) => {
    const res = await fetch(`/api/postings/${posting.id}`, {
      method: 'DELETE'
    })
    dispatch(refreshUser(user.id))
  }

  return (
    <div>
      <div>Your Postings: </div>
      {user && user.postings.map(posting => (
        <div key={posting.id}>
          <NavLink to={`/postings/${posting.id}`}>
            <div>{posting.address}</div>
            <div>{posting.price}</div>
          </NavLink>
          <button className='edt-and-del-btns' onClick={() => deleteClick(posting)}>Delete</button>
        </div>
      ))}
    </div>
  )
}

export default MyPostings;