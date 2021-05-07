import React from 'react'
import usePlacesAutocomplete, {getGeocode, getLatLng} from 'use-places-autocomplete';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption} from '@reach/combobox';
import {GoogleMap, Marker, useLoadScript} from '@react-google-maps/api';

const SearchBar = () => {
  const {REACT_APP_GOOGLE_API_KEY} = process.env;
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey : REACT_APP_GOOGLE_API_KEY,
    libraries : ['places']
  })

  const {ready, value, suggestions : {state, data}, setValue, clearSuggestions} = usePlacesAutocomplete()
  console.log(ready, value, state, data, '************** USEPLACES')
  return(
    <div>
      <Combobox onSelect={(info) => {console.log(info)}}>
        <ComboboxInput value={value} onChange={e => setValue(e.target.value)} placeholder='Search for a city'/>
        <ComboboxPopover>
          {data.map(({id, description}) => (
            <ComboboxInput key={id} value={description} />
          ))}
        </ComboboxPopover>
      </Combobox>
    </div>
  )
}

export default SearchBar;