import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {getBuildingTypes, addPosting} from '../../store/posting';
import {refreshUser} from '../../store/session';
import {loadingTags} from '../../store/filters';


import './PostingForm.css'

const PostingForm = () => {

  const states=['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY']

  const dispatch = useDispatch()
  const history = useHistory()

  const [page, setPage] = useState(0);

  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState(0)
  const [buildingType, setBuildingType] = useState(0)
  const [type, setType] = useState('')
  const [beds, setBeds] = useState(0)
  const [guests, setGuests] = useState(0)
  const [bathrooms, setBathrooms] = useState(0)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [ppu, setPpu] = useState('')
  const [edit, setEdit] = useState(false)
  const [imageLoading, setImageLoading] = useState(false)
  const [tags, setTags] = useState([])

  
  
  const user = useSelector(state => {
    return state.session.user;
  });
  
  const buildingTypes = useSelector(state => {
    return state.postings.buildingTypes;
  })
  
  const allTags = useSelector(state => {
    return state.filters.tagTypes
  })

  useEffect(() => {
    dispatch(getBuildingTypes())
    dispatch(loadingTags())
  }, [dispatch])

  useEffect(() => {
    const thisBuilding = buildingTypes.filter(bt => Number(bt.id) === Number(buildingType))
    if (thisBuilding[0]){
      setType(thisBuilding[0].type)
    }
  },[buildingType, buildingTypes])
  
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
  
  const formateAddress = (address, city, state) => {
    const newAddress = address.split(' ').join('+')
    const newCity = city.split(' ').join('+')
    return `${newAddress},+${newCity},+${state}`
  }
  
  const submitForm = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    
    formData.append('image', image)
    formData.append('city', city)
    formData.append('address', `${address}, ${city}, ${state}`)
    formData.append('buildingTypeId', buildingType)
    formData.append('numGuests', guests)
    formData.append('numBeds', beds)
    formData.append('numBathrooms', bathrooms)
    formData.append('description', description)
    formData.append('title', title)
    formData.append('price', ppu)
    formData.append('tags', tags)
    
    const formattedAddress = formateAddress(address, city, state) 
    const formData1 = new FormData()
    formData1.append('address', formattedAddress)
    const foundResponse = await fetch('/api/postings/latlng', {
      method: 'POST',
      body: formData1
    })
    const locationData = await foundResponse.json()
    const {lat, lng} = locationData.results[0].geometry.location
    formData.append('lng', lng)
    formData.append('lat', lat)

    setImageLoading(true)

    const res = await fetch('/api/postings',{
      method : 'POST',
      body : formData,
    });

    if (res.ok) { 
      setImageLoading(false)
      const posting = await res.json()
      dispatch(refreshUser(user.id))
      dispatch(addPosting(posting))
      history.push(`/postings/${posting.id}`)
    } else {
      setImageLoading(false)
    }
  }

  const changeTags = (type) => {
    if (!tags.includes(type)) setTags([...tags,type])
    else setTags(tags.filter(tag => tag !== type))
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
              <select className='form-input location-input' value={state} onChange={(e) => setState(e.target.value)}>
                <option value={0} disabled>Select State</option>
                {states.map(state => (
                  <option value={state} key={state}>{state}</option>
                ))}
              </select>
            
            </form>
              {!edit && <button className='continue-btn first-continue' disabled={!city} onClick={formContinue}>Continue</button>}
              {edit && <button className='continue-btn first-continue' onClick={() => setPage(7)}>Update</button>}
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
              {!edit && <button className='continue-btn' onClick={formBack}>Back</button>}
              {!edit && <button className='continue-btn' disabled={!buildingType} onClick={formContinue}>Continue</button>}
              {edit && <button className='continue-btn first-continue' onClick={() => setPage(7)}>Update</button>}
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
              {!edit && <button className='continue-btn' onClick={formBack}>Back</button>}
              {!edit && <button className='continue-btn' disabled={!guests} onClick={formContinue}>Continue</button>}
              {edit && <button className='continue-btn first-continue' onClick={() => setPage(7)}>Update</button>}
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
              {!edit && <button className='continue-btn' onClick={formBack}>Back</button>}
              {!edit && <button className='continue-btn' disabled={!title} onClick={formContinue}>Continue</button>}
              {edit && <button className='continue-btn first-continue' onClick={() => setPage(7)}>Update</button>}
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
              {!edit && <button className='continue-btn' onClick={formBack}>Back</button>}
              {!edit && <button className='continue-btn' disabled={!image} onClick={formContinue}>Continue</button>}
              {edit && <button className='continue-btn first-continue' onClick={() => setPage(7)}>Update</button>}
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
            <div className='form-question'>Name the price per night for renting your property.</div>
            <form>
              <input type='number' className='form-input title-input' placeholder='Price Per Night' value={ppu} onChange={(e) => setPpu(e.target.value)}/>
            </form>
            <div className='form-btn-wrapper'>
              {!edit && <button className='continue-btn' onClick={formBack}>Back</button>}
              {!edit && <button className='continue-btn' disabled={!ppu} onClick={formContinue}>Continue</button>}
              {edit && <button className='continue-btn first-continue' onClick={() => setPage(7)}>Update</button>}
            </div>
          </div>
        </div>
      )}
      {page===6 && (
        <div className='form-wrapper'>
          <div className='left-form'>
            <div className='form-title'>Select Tags That Apply</div>
            <div className='form-step'>Step 7</div>
            <div className='form-question'>Finally, select any tags that will help draw people to your property.</div>
            <form className='location-form'>
              {allTags && Object.values(allTags).map(tag => (
                <div className='tag-form-select' key={tag.id}>
                  <div>{tag.type}</div>
                  <input type='checkbox' value={tag.type} onChange={(e) => changeTags(e.target.value)} checked={tags.includes(tag.type)}/>
                </div>
              ))}
            </form>
            <div className='form-btn-wrapper'>
              {!edit && <button className='continue-btn' onClick={formBack}>Back</button>}
              {!edit && <button className='continue-btn' disabled={!ppu} onClick={formContinue}>Continue</button>}
              {edit && <button className='continue-btn first-continue' onClick={() => setPage(7)}>Update</button>}
            </div>
          </div>
          <div className='right-form'>
            <div className='form-image tags-form-image'/>
          </div>
        </div>
      )}
      {page===7 &&(
        <div className='form-wrapper edit-form-start'>
          <div className='left-form'>
            <div className='form-title'>Confirm your information</div>
            <div className='form-step'>Step 8</div>
            <div className='form-question'>Please take a minute to double check all of the information that you have entered.</div>
            <div>
              <button className='confirm-btn' onClick={submitForm}>Confirm</button>
              {imageLoading && <div>Please wait while we make your posting.</div>}
            </div>
          </div>
          <div className='right-form'>
            <div className='form-data-wrapper'>
              <div className='form-data-label'>Address : </div>
              <div className='form-edit-wrapper'>
                <div className='form-data-info'>{`${address}, ${city}, ${state}`}</div>
                <button className='form-edit-btn' onClick={() => {
                  setEdit(true)
                  setPage(0)
                }}>Edit</button>
              </div>
            </div>
            <div className='form-data-wrapper'>
              <div className='form-data-label'>Building Type : </div>
              <div className='form-edit-wrapper'>
                <div className='form-data-info'>{type}</div>
                <button className='form-edit-btn' onClick={() => {
                  setEdit(true)
                  setPage(1)
                }}>Edit</button>
              </div>
            </div>
            <div className='form-data-wrapper'>
              <div className='form-data-label'>Number of Beds : </div>
              <div className='form-edit-wrapper'>
                <div className='form-data-info'>{beds}</div>
                <button className='form-edit-btn' onClick={() => {
                  setEdit(true)
                  setPage(2)
                }}>Edit</button>
              </div>
            </div>
            <div className='form-data-wrapper'>
              <div className='form-data-label'>Number of Guests : </div>
              <div className='form-edit-wrapper'>
                <div className='form-data-info'>{guests}</div>
                <button className='form-edit-btn' onClick={() => {
                  setEdit(true)
                  setPage(2)
                }}>Edit</button>
              </div>
            </div>
            <div className='form-data-wrapper'>
              <div className='form-data-label'>Number of Bathrooms : </div>
              <div className='form-edit-wrapper'>
                <div className='form-data-info'>{bathrooms}</div>
                <button className='form-edit-btn' onClick={() => {
                  setEdit(true)
                  setPage(2)
                }}>Edit</button>
              </div>
            </div>
            <div className='form-data-wrapper'>
              <div className='form-data-label'>Posting Title : </div>
              <div className='form-edit-wrapper'>
                <div className='form-data-info'>{title}</div>
                <button className='form-edit-btn' onClick={() => {
                  setEdit(true)
                  setPage(3)
                }}>Edit</button>
              </div>
            </div>
            <div className='form-data-wrapper'>
              <div className='form-data-label'>Posting Description : </div>
              <div className='form-edit-wrapper'>
                <div className='form-data-info'>{description}</div>
                <button className='form-edit-btn' onClick={() => {
                  setEdit(true)
                  setPage(3)
                }}>Edit</button>
              </div>
            </div>
            <div className='form-data-wrapper'>
              <div className='form-data-label'>Price Per Night : </div>
              <div className='form-edit-wrapper'>
                <div className='form-data-info'>{`$${ppu}`}</div>
                <button className='form-edit-btn' onClick={() => {
                  setEdit(true)
                  setPage(5)
                }}>Edit</button>
              </div>
            </div>
            <div className='form-data-wrapper'>
              <div className='form-data-label'>Associated Tags : </div>
              <div className='form-edit-wrapper'>
                <div className='form-data-info'>{`${tags.join(', ')}`}</div>
                <button className='form-edit-btn' onClick={() => {
                  setEdit(true)
                  setPage(6)
                }}>Edit</button>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  )
}

export default PostingForm