import React from 'react';
import {useHistory} from 'react-router-dom';

import './HomePage.css';


const HomePage = () => {

  const history = useHistory()

  const onClick = () => {
    history.push('/postings/form')
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
          <p className='city-name'>New York, NY</p>
        </div>
        <div className='city-wrapper'>
          <div className='city-image maui'/>
          <p className='city-name'>Maui, HI</p>
        </div>
        <div className='city-wrapper'>
          <div className='city-image las-vegas'/>
          <p className='city-name'>Las Vegas, NV</p>
        </div>
        <div className='city-wrapper'>
          <div className='city-image new-orleans'/>
          <p className='city-name'>New Orleans, LA</p>
        </div>
        <div className='city-wrapper'>
          <div className='city-image key-west'/>
          <p className='city-name'>Key West, FL</p>
        </div>
        <div className='city-wrapper'>
          <div className='city-image san-diego'/>
          <p className='city-name'>San Diego, CA</p>
        </div>
        <div className='city-wrapper'>
          <div className='city-image savannah'/>
          <p className='city-name'>Savannah, GA</p>
        </div>
        <div className='city-wrapper'>
          <div className='city-image charleston'/>
          <p className='city-name'>Charleston, NC</p>
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