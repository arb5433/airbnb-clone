import React from 'react';
import {GoogleMap, Marker, useLoadScript} from '@react-google-maps/api';

const options = {
  libraries : ['places']
}

const center = {lat: -3.745, lng: -38.523}
const mapContainerStyle={height:'100vh', width:'100vw'}

const Map = () => {

  const {REACT_APP_GOOGLE_API_KEY} = process.env;
  console.log(REACT_APP_GOOGLE_API_KEY)
  // try to dynamically pass lat and lng down as props
  // const lat=-3.745;
  // const lng = -38.523

  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey : REACT_APP_GOOGLE_API_KEY,
    ...options
  })

  console.log(isLoaded, loadError)
  const mapRef = React.useRef();
	const onLoad = React.useCallback((map) => {
		mapRef.current = map;
	}, []);

  if (loadError) return <h1>Error Loading Google Maps</h1>


  return (
    <div className='map-wrapper'>
      {isLoaded && <GoogleMap mapContainerStyle={mapContainerStyle} zoom={7} center={center} onLoad={onLoad}></GoogleMap>}
    </div>
  )
}

export default Map;