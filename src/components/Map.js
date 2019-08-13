import React from 'react';
import { connect } from 'react-redux';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { compose, withProps } from "recompose";
import { highlightRestaurant } from '../actions/inputRestaurant';

const mapStyles = {
  width: '32rem',
  height: '100vh',
}

class Map extends React.Component {
  constructor(props) {
    super(props);
  }

  onMarkerClick = (lat, lng, id) => {
    this.props.highlightRestaurant({ lat, lng, id })
  }

  render() {
    return (
      <GoogleMap
        defaultZoom={13}
        defaultCenter={{ lat: 52.524750, lng: 13.393030 }}
        center={{ 
          lat: this.props.highlighted.lat, 
          lng: this.props.highlighted.lng 
        }}
      >
        { this.props.saved && this.props.saved.map(loc => (
          <Marker
            key={`${loc.name}${loc.lat}`}
            name={loc.name}
            food={loc.food}
            rating={loc.rating}
            id={loc.id}
            onClick={() => this.onMarkerClick(loc.lat, loc.lng, loc.id)}
            position={{lat: loc.lat, lng: loc.lng}}
          />
        ))}
      </GoogleMap>
    )
  }
} 

const mapStateToProps = (state) => {
  return {
    currLoc: state.inputRestaurantReducer.currLoc,
    saved: state.inputRestaurantReducer.saved,
    highlighted: state.inputRestaurantReducer.highlighted
  }
};

const mapDispatchToProps = (dispatch) => ({
  highlightRestaurant: data => dispatch(highlightRestaurant(data))
});

export default connect(mapStateToProps, mapDispatchToProps)
(compose(
  withProps({
    isMarkerShown: true,
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=AIzaSyBV5-KCkU8agm5jOw_B42QLVOjAvxj0XI0&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `50vh` }} />,
    mapElement: <div style={mapStyles} />
  }),
  withScriptjs,
  withGoogleMap
)(Map));
