import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect} from 'react';
import {getPostings} from '../../store/posting'

const Testing = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    console.log('*********************in the use effect*********************')
    dispatch(getPostings)
  }, [dispatch])

  return (
    <h1> Testing the store </h1>
  )
}

export default Testing