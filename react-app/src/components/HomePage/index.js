import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {getPostings} from '../../store/posting';
import {setBounds} from '../../store/map';

import './HomePage.css';


const HomePage = () => {

  const REACT_APP_GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

  const history = useHistory()
  const dispatch = useDispatch()

  const onClick = () => {
    history.push('/postings/form')
  }

  useEffect(() => {
    dispatch(getPostings())
  }, [dispatch])

  const onCityClick = async (address) => {
    const formattedAddress = address.split(' ').join('+')
    const formData = new FormData()
    formData.append('address', formattedAddress)
    const foundResponse = await fetch('/api/postings/latlng', {
      method: 'POST',
      body: formData
    })
    const locationData = await foundResponse.json()
    const {lat, lng} = locationData.results[0].geometry.location
    history.push(`/postings/search/${lat}/${lng}`)
  }

  return (
    <div className='home-wrapper'>
      <div className='home-banner'/>
      <div className='title'>
        <h1>Popular Vacation Destinations</h1>
      </div>
      <div className='popular-cities-wrapper'>
        <div className='city-wrapper'>
          <div className='city-image new-york'/>
          <button className='city-name' onClick={() => onCityClick('New York, NY')}>New York, NY</button>
        </div>
        <div className='city-wrapper'>
          <div className='city-image maui'/>
          <button className='city-name' onClick={() => onCityClick('Maui, HI')}>Maui, HI</button>
        </div>
        <div className='city-wrapper'>
          <div className='city-image las-vegas'/>
          <button className='city-name' onClick={() => onCityClick('Las Vegas, NV')}>Las Vegas, NV</button>
        </div>
        <div className='city-wrapper'>
          <div className='city-image new-orleans'/>
          <button className='city-name' onClick={() => onCityClick('New Orleans, LA')}>New Orleans, LA</button>
        </div>
        <div className='city-wrapper'>
          <div className='city-image key-west'/>
          <button className='city-name' onClick={() => onCityClick('Key West, FL')}>Key West, FL</button>
        </div>
        <div className='city-wrapper'>
          <div className='city-image san-diego'/>
          <button className='city-name' onClick={() => onCityClick('San Diego, CA')}>San Diego, CA</button>
        </div>
        <div className='city-wrapper'>
          <div className='city-image savannah'/>
          <button className='city-name' onClick={() => onCityClick('Savannah, GA')}>Savannah, GA</button>
        </div>
        <div className='city-wrapper'>
          <div className='city-image charleston'/>
          <button className='city-name' onClick={() => onCityClick('Charleston, NC')}>Charleston, NC</button>
        </div>
      </div>
      <div className='title'>
        <h1>Special Requests</h1>
      </div>
      <div className='home-tags-wrapper'>
        <div className='home-tags-item'>
          <div className='home-tags-picture secluded'/>
          <p className='home-tag-name'>Secluded</p>
        </div>
        <div className='home-tags-item'>
          <div className='home-tags-picture pets'/>
          <p className='home-tag-name'>Pets Allowed</p>
        </div>
        <div className='home-tags-item'>
          <div className='home-tags-picture full-house'/>
          <p className='home-tag-name'>Entire Home</p>
        </div>
        <div className='home-tags-item'>
          <div className='home-tags-picture unique'/>
          <p className='home-tag-name'>Unique Housing</p>
        </div>
      </div>
      <div className='hosting-link-wrapper'>
        <div className='hosting-image'/>
        <div className='hosting-txt-btn-wrapper'>
          <div>
            <div className='hosting-txt-title'>Host a Property</div>
            <div className='hosting-txt-body'>Earn passive income by opening your home to others.</div>
          </div>
          <div className='host-btn-div'>
            <button className='hosting-btn' onClick={onClick}>Start Hosting Now</button>
          </div>
        </div>
      </div>
      <div className='footer'>
        <a className='dev-name' href='https://github.com/arb5433/airbnb-clone/wiki'>My Wiki</a>
        <div className='dev-name'>Created By: Adam Bailey</div>
        <a className='dev-name' href='https://github.com/arb5433'>Github Profile</a>
      </div>
    </div>
  )
}

export default HomePage