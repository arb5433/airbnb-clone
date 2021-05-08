import React, {useEffect} from 'react'
import usePlacesAutocomplete, {getGeocode, getLatLng} from 'use-places-autocomplete';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption} from '@reach/combobox';
import './SearchBar.css'




const SearchBar = () => {
  const {ready, value, suggestions : {status, data}, setValue, clearSuggestions} = usePlacesAutocomplete()
  // console.log(ready, value, status, data, '************** USEPLACES')

  const onSelect = async (address) => {
    console.log(address)
    const city = address.split(',')[0]
    console.log(city)
    const results = await getGeocode({address});
    // console.log(results)
    const {lat, lng} = await getLatLng(results[0]);
    console.log(lat, lng)
    setValue('')
    clearSuggestions()
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