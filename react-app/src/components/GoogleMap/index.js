import React, {useState, useEffect, useRef, useCallback} from 'react';
import {GoogleMap, Marker, useLoadScript} from '@react-google-maps/api';
import {useDispatch, useSelector} from 'react-redux';
import {getPostings, relativePostings} from '../../store/posting';
import {setBounds} from '../../store/map'

const libraries = ['places']

const otherOptions = {
  disableDefaultUI : true,
  zoomControl : true
}

// const center = {lat: 40.7127753, lng: -74.0059728}
const mapContainerStyle={height:'calc(100vh - 50px)', width:'50vw'}

const Map = ({lat, lng}) => {

  const dispatch = useDispatch()
  const [count, setCount] = useState(0)
  
  // useEffect(() => {
  //   dispatch(getPostings())
  // }, [dispatch])

  const positions = useSelector(state => {
    const postings = state.postings.postingsList.map(postingId => state.postings[postingId]);
    return postings.map(posting => {
      return {id:posting.id, lat:posting.lat, lng: posting.lng}
    })
  });

  const postings = useSelector(state => {
    // console.log(state.postings)
    return state.postings
  })

  const mapBounds = useSelector(state => {
    // console.log(state.map.bounds)
    return state.map.bounds
  })
  // console.log('*******POSTINGS ********', postings)
  // console.log('********MAP**********', mapBounds)

  const postingArray = Object.values(postings)
  
  useEffect(() => {
    if (mapBounds && postingArray){
      const relativePosting = postingArray.filter(posting => {
        return (mapBounds.lats[0] < posting.lat && posting.lat < mapBounds.lats[1] && mapBounds.lngs[0] < posting.lng && posting.lng < mapBounds.lngs[1])
      })
      // console.log('**********RELATIVE*************', relativePostings)
      const showPostings = relativePosting.map(posting => posting.id)
      // console.log(showPostings)
      dispatch(relativePostings(showPostings))
    }
  })

  useEffect(() => {
    setTimeout(() =>  {
      
    }, 2000)
  },[])
  

  
  const center = { lat: Number(lat), lng: Number(lng)}
  const {REACT_APP_GOOGLE_API_KEY} = process.env;

  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey : REACT_APP_GOOGLE_API_KEY,
    libraries : libraries
  })

  const mapRef = useRef();
	const onLoad = useCallback((map) => {
		mapRef.current = map;
	}, []);

  const onBoundsChanged =(map) =>{
    const northEast = mapRef.current.getBounds().getNorthEast()
    const southWest = mapRef.current.getBounds().getSouthWest()
    const bounds = {lats : [southWest.lat(), northEast.lat()], lngs : [southWest.lng(), northEast.lng()]}
    dispatch(setBounds(bounds))
    // console.log('dispatched bounds')
    setCount(count+1)
  }



  if (loadError) return <h1>Error Loading Google Maps</h1>


  return (
    <div className='map-wrapper'>
      {isLoaded && <GoogleMap 
        mapContainerStyle={mapContainerStyle} 
        zoom={7} 
        center={center} 
        options={otherOptions} 
        onLoad={onLoad}
        onBoundsChanged={onBoundsChanged}>
        {positions.map((marker) => (
            <Marker
              key={marker.id}
              position={{ lat: marker.lat, lng: marker.lng }}
              // onClick go to the property page
            />
          ))}  
      </GoogleMap>}
    </div>
  )
}

export default Map;