import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getBuildingTypes} from '../../store/posting';

import './PostingForm.css'

const PostingForm = () => {

  const dispatch = useDispatch()

  const [page, setPage] = useState(0);
  const [address, setAddress] = useState('')
  const [buildingType, setBuildingType] = useState(0)

  useEffect(() => {
    dispatch(getBuildingTypes())
  }, [dispatch])

  const user = useSelector(state => {
    return state.session.user;
  });

  const buildingTypes = useSelector(state => {
    return state.postings.buildingTypes;
  })

  console.log('***********BT*******************', buildingTypes)

  const formContinue = (e) => {
    e.preventDefault()
    setPage(1)
  }

  return (
    <div className='posting-form-wrapper'>
      {page===0 && (
        <div className='form-wrapper'>
          <div className='right-form'>
            <div className='form-title'>{`Hi, ${user.username}! Let's get started listing your property.`}</div>
            <div className='form-step'>Step 1</div>
            <div className='form-question'>Where is your property located?</div>
            <form className='location-form'>
              <input className='location-input form-input' value={address} onChange={(e) => setAddress(e.target.value)} placeholder='Property Address'/>
            </form>
              <button className='first-continue-btn' onClick={formContinue}>Continue</button>
          </div>
          <div className='left-form'>
            <div className='location-form-image form-image'/>
          </div>
        </div>
      )}
      {page===1 && (
        <div className='form-wrapper'>
          <div className='right-form'>
            <div className='building-form-image form-image'/>
          </div>
          <div className='left-form'>
            <div className='form-title'>What type of building are you posting?</div>
            <div className ='form-step'>Step 2</div>
            <div className='form-question'>Choose a property type</div>
            <form className='building-type-form'>
              <select className='building-type-input form-input' value={buildingType} onChange={(e) => setBuildingType(e.target.value)}>
                <option disabled value={0}>Select A Building Type</option>
                {buildingTypes && buildingTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.type}</option>
                ))}
              </select>
            </form>
          </div>

        </div>
      )}
      
    </div>
  )
}

export default PostingForm