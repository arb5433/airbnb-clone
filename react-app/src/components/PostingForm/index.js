import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getBuildingTypes} from '../../store/posting';

import './PostingForm.css'

const PostingForm = () => {

  const states=['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming']

  const dispatch = useDispatch()

  const [page, setPage] = useState(0);
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState(0)
  const [buildingType, setBuildingType] = useState(0)
  const [beds, setBeds] = useState(0)
  const [guests, setGuests] = useState(0)
  const [bathrooms, setBathrooms] = useState(0)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [ppu, setPpu] = useState()

  useEffect(() => {
    dispatch(getBuildingTypes())
  }, [dispatch])

  const user = useSelector(state => {
    return state.session.user;
  });

  const buildingTypes = useSelector(state => {
    return state.postings.buildingTypes;
  })

  const formContinue = (e) => {
    setPage(page+1)
  }

  const formBack = (e) => {
    setPage(page-1)
  }

  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  }


  return (
    <div className='posting-form-wrapper'>
      {page===0 && (
        <div className='form-wrapper'>
          <div className='left-form'>
            <div className='form-title'>{`Hi, ${user.username}! Let's get started listing your property.`}</div>
            <div className='form-step'>Step 1</div>
            <div className='form-question'>Where is your property located?</div>
            <form className='location-form'>
              <input className='location-input form-input' value={address} onChange={(e) => setAddress(e.target.value)} placeholder='Street Address'/>
              <input className='location-input form-input' value={city} onChange={(e) => setCity(e.target.value)} placeholder='City'/>
              <select className='form-input location-input'value={state} onChange={(e) => setState(e.target.value)}>
                <option value={0} disabled>Select State</option>
                {states.map(state => (
                  <option value={state} key={state}>{state}</option>
                ))}
              </select>
            
            </form>
              <button className='continue-btn first-continue' onClick={formContinue}>Continue</button>
          </div>
          <div className='right-form'>
            <div className='location-form-image form-image'/>
          </div>
        </div>
      )}
      {page===1 && (
        <div className='form-wrapper'>
          <div className='left-form'>
            <div className='building-form-image form-image'/>
          </div>
          <div className='right-form'>
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
            <div className='form-btn-wrapper'>
              <button className='continue-btn' onClick={formBack}>Back</button>
              <button className='continue-btn' onClick={formContinue}>Continue</button>
            </div>
          </div>
        </div>
      )}
      {page===2 && (
        <div className='form-wrapper'>
          <div className='left-form'>
            <div className='form-title'>Give us some additional information about your property.</div>
            <div className='form-step'>Step 3</div>
            <div className='form-question'>Please provide the following information.</div>
            <form className='details-form'>
              <div className='details-form-field'>
                <div>Number of Beds: </div>
                <input type='number' value={beds} onChange={(e) => setBeds(e.target.value)}></input>
              </div>
              <div className='details-form-field'>
                <div>Number of Guests: </div>
                <input type='number' value={guests} onChange={(e) => setGuests(e.target.value)}></input>
              </div>
              <div className='details-form-field'>
                <div>Number of Bathrooms: </div>
                <input type='number' value={bathrooms} onChange={(e) => setBathrooms(e.target.value)}></input>
              </div>
            </form>
            <div className='form-btn-wrapper'>
              <button className='continue-btn' onClick={formBack}>Back</button>
              <button className='continue-btn' onClick={formContinue}>Continue</button>
            </div>
          </div>
          <div className='right-form'>
            <div className='form-image details-form-image'/>
          </div>
        </div>
      )}
      {page===3 &&(
        <div className='form-wrapper'>
          <div className='left-form'>
            <div className='form-image description-form-image'/>
          </div>
          <div className='right-form'>
            <div className='form-title'>Make your posting stand out from the rest.</div>
            <div className='form-step'>Step 4</div>
            <div className='form-question'>Personalize your property and make it stand out to potential renters.</div>
            <form className='title-and-desc-form'>
              <input className='title-input form-input' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Posting Title'/>
              <textarea className='form-text' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Property Description'/>
            </form>
            <div className='form-btn-wrapper'>
              <button className='continue-btn' onClick={formBack}>Back</button>
              <button className='continue-btn' onClick={formContinue}>Continue</button>
            </div>
          </div>
        </div>
      )}
      {page===4 &&(
        <div className='form-wrapper'>
          <div className='left-form'>
            <div className='form-title'>Upload your main image.</div>
            <div className='form-step'>Step 5</div>
            <div className='form-question'>This will be the main image for your posting, you can add additional images after you create the posting.</div>
            <form>
              <input className='upload-form-btn' type="file" accept="image/*" onChange={updateImage}/>
            </form>
            <div className='form-btn-wrapper'>
              <button className='continue-btn' onClick={formBack}>Back</button>
              <button className='continue-btn' onClick={formContinue}>Continue</button>
            </div>
          </div>
          <div className='right-form'>
            <div className='form-image upload-form-image'/>
          </div>
        </div>
      )}
      {page===5 &&(
        <div className='form-wrapper'>
          <div className='left-form'>
            <div className='form-image money-form-image'/>
          </div>
          <div className='right-form'>
            <div className='form-title'>Price Per Night</div>
            <div className='form-step'>Step 6</div>
            <div className='form-question'>Last, but certainly not least, name the price per night for renting your property.</div>
            <form>
              <input type='number' className='form-input title-input' placeholder='Price Per Night' value={ppu} onChange={(e) => setPpu(e.target.value)}/>
            </form>
            <div className='form-btn-wrapper'>
              <button className='continue-btn' onClick={formBack}>Back</button>
              <button className='continue-btn' onClick={formContinue}>Continue</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PostingForm