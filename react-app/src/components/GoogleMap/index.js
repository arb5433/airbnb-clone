import React, {useState, useEffect, useRef, useCallback} from 'react';
import {useHistory} from 'react-router-dom';
import {GoogleMap, Marker, useLoadScript} from '@react-google-maps/api';
import {useDispatch, useSelector} from 'react-redux';
import {relativePostings} from '../../store/posting';
import {setBounds} from '../../store/map'

const libraries = ['places']

const otherOptions = {
  disableDefaultUI : true,
  zoomControl : true
}

const mapContainerStyle={height:'calc(100vh - 50px)', width:'50vw'}

const center={lat:40.7127753, lng:-74.0059728}
const Map = ({lat, lng}) => {
  
  const dispatch = useDispatch()
  const history = useHistory()
  const [count, setCount] = useState(0)
  
  const positions = useSelector(state => {
    const postings = state.postings.shownPostings.map(postingId => state.postings[postingId]);
    return postings.map(posting => {
      return {id:posting.id, lat:posting.lat, lng: posting.lng}
    })
  });

  const postings = useSelector(state => {
    return state.postings
  })

  const mapBounds = useSelector(state => {
    return state.map.bounds
  })

  const shownPostings = useSelector(state => {
    return state.postings.shownPostings
  })

  const filters = useSelector(state => {
    return state.filters.filters
  })

  const postingArray = Object.values(postings)
  
  const mapRef = useRef();
  const onLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);
  
 
  // const center = { lat: Number(lat), lng: Number(lng)}


  const onBoundsChanged = () =>{
    const northEast = mapRef.current.getBounds().getNorthEast()
    const southWest = mapRef.current.getBounds().getSouthWest()
    const bounds = {lats : [southWest.lat(), northEast.lat()], lngs : [southWest.lng(), northEast.lng()]}
    if(!Object.deepEq(mapBounds, bounds)) dispatch(setBounds(bounds))
  }

  const intersection = (filterKeys, postingKeys) => {
    return filterKeys.filter(filter => postingKeys.includes(filter))
  }
  
  useEffect(() => {
    if (mapBounds){
      let relativePosting = postingArray.filter(posting => {
        return (mapBounds.lats[0] < posting.lat && posting.lat < mapBounds.lats[1] && mapBounds.lngs[0] < posting.lng && posting.lng < mapBounds.lngs[1])
      })
      let filterKeys = []
      if (filters) filterKeys = Object.keys(filters)
      if (filterKeys.length > 0){
          const newPostings = relativePosting.filter(posting => {
            const postingKeys = Object.keys(posting.tags)
            const check = intersection(filterKeys, postingKeys)
            return check.length === filterKeys.length
        })
        const showPostings = newPostings.map(posting => posting.id)
        if(!Object.deepEq(showPostings, shownPostings)) dispatch(relativePostings(showPostings))
      }
      if (filterKeys.length === 0){
        const showPostings = relativePosting.map(posting => posting.id)
        if(!Object.deepEq(showPostings, shownPostings)) dispatch(relativePostings(showPostings))
      }
    }
    mapRef.current && onBoundsChanged()
  },[mapBounds, postingArray, dispatch, onBoundsChanged, mapRef.current, filters])
  
  const REACT_APP_GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey : REACT_APP_GOOGLE_API_KEY,
    libraries : libraries
  })

  useEffect(() => {
    if (mapRef.current && isLoaded && count < 1 && lat && lng){
      mapRef.current.panTo({lat: Number(lat), lng: Number(lng)})
      setCount(count + 1)
    }
  },[isLoaded, count, mapRef.current])

  const onClick = (marker) => {
    history.push(`/postings/${marker.id}`)
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
        onBoundsChanged={onBoundsChanged}
        >
        {positions.map((marker) => (
            <Marker
              key={marker.id}
              position={{ lat: marker.lat, lng: marker.lng }}
              onClick = {() => onClick(marker)}
            />
          ))}  
      </GoogleMap>}
    </div>
  )
}

export default Map;