import React from 'react';
import {useHistory} from 'react-router-dom';
import usePlacesAutocomplete, {getGeocode, getLatLng} from 'use-places-autocomplete';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption} from '@reach/combobox';
import './SearchBar.css'




const SearchBar = () => {
  const {ready, value, suggestions : {status, data}, setValue, clearSuggestions} = usePlacesAutocomplete()
  const history = useHistory()

  const onSelect = async (address) => {
    const city = address.split(',')[0]
    const results = await getGeocode({address});
    const {lat, lng} = await getLatLng(results[0]);
    setValue('')
    clearSuggestions()
    history.push(`/postings/search/${lat}/${lng}`)

  }
  return(
    <div>
      <Combobox onSelect={onSelect}>
        <ComboboxInput value={value} onChange={e => setValue(e.target.value)} placeholder='Search for a city'/>
        <ComboboxPopover className='popover'>
          {data.map(({id, description}) => (
            <ComboboxOption key={id} value={description} />
          ))}
        </ComboboxPopover>
      </Combobox>
    </div>
  )
}

export default SearchBar;