import React from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import { GoogleApiWrapper } from 'google-maps-react';
import '../css/AutoComplete.css';

const MY_API_KEY = "AIzaSyAUpjcevL9Lyf9lK_pawwbvz_PLj3-1hrg" // fake

class LocationSearchInput1 extends React.Component {
    constructor(props) {
        super(props);  
        this.state = { address: '' }
      }
    
      handleChange = (address) => {
        this.setState({ address })
      }
    
      handleSelect = (address) => {
        this.setState({ address });
        
        geocodeByAddress(address)
          .then(results => getLatLng(results[0]))
          .then(latLng => this.props.onSelectedPlace(latLng))
          .catch(error => console.error('Error', error))
      }
    
      render() {
        return (
          <PlacesAutocomplete
            value={this.state.address}
            onChange={this.handleChange}
            onSelect={this.handleSelect}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps }) => (
              <div>
                <input
                  {...getInputProps({
                    placeholder: 'Search Places ...',
                    className: 'location-search-input'
                  })}
                />
                <div className="autocomplete-dropdown-container">
                  {suggestions.map(suggestion => {
                    const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                    // inline style for demonstration purpose
                    const style = suggestion.active
                                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                : { backgroundColor: '#ffffff', cursor: 'pointer' };
                    return (
                      <div {...getSuggestionItemProps(suggestion, { className, style })}>
                        <span>{suggestion.description}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        );
      }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyAUpjcevL9Lyf9lK_pawwbvz_PLj3-1hrg"
})(LocationSearchInput1)