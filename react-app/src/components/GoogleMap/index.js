import React, {useState, useEffect} from 'react';
import {GoogleMap, Marker, useLoadScript} from '@react-google-maps/api';
import {useDispatch, useSelector} from 'react-redux';
import {getPostings} from '../../store/posting';

const options = ['places']


const otherOptions = {
  disableDefaultUI : true,
  zoomControl : true
}

const mapContainerStyle={height:'100vh', width:'100vw'}

const Map = () => {

  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getPostings())
  }, [dispatch])

  const positions = useSelector(state => {
    const postings = state.postings.postingsList.map(postingId => state.postings[postingId]);
    return postings.map(posting => {
      return {id:posting.id, lat:posting.lat, lng: posting.lng}
    })
  });
  console.log(positions)
  
  // const center = { lat: Number(lat), lng: Number(lng)}
  const center = {lat: 40.7127753, lng: -74.0059728}
  const {REACT_APP_GOOGLE_API_KEY} = process.env;
  // try to dynamically pass lat and lng down as props
  // const lat=-3.745;
  // const lng = -38.523

  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey : REACT_APP_GOOGLE_API_KEY,
    libraries : options
  })

  console.log(isLoaded, loadError)
  const mapRef = React.useRef();
	const onLoad = React.useCallback((map) => {
		mapRef.current = map;
	}, []);

  if (loadError) return <h1>Error Loading Google Maps</h1>


  return (
    <div className='map-wrapper'>
      {isLoaded && <GoogleMap 
        mapContainerStyle={mapContainerStyle} 
        zoom={7} 
        center={center} 
        options={otherOptions} 
        onLoad={onLoad} >
        {positions.map((marker) => (
            <Marker
              key={marker.id}
              position={{ lat: marker.lat, lng: marker.lng }}
            />
          ))}  
      </GoogleMap>}
    </div>
  )
}

// deploying things


export default Map;