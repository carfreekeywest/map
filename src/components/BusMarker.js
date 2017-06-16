import React, { Component } from 'react';
import PropTypes from 'prop-types';
import slug from 'slug';
import { Popup as MapboxPopup } from 'react-mapbox-gl';
import { getBusLocation } from '../services/bus';

export default class BusMarker extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      currentPosition: []
    };
  }

  componentWillMount() {
    this.updateBusLocation();
    if (!this.interval) {
      this.interval = setInterval(this.updateBusLocation.bind(this), 7000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    this.interval = null;
  }

  updateBusLocation() {
    getBusLocation(this.props.id, vehicles => {
      const vehicle = vehicles[0];
      if (vehicle) {
        this.setState({
          currentPosition: [vehicle.lon, vehicle.lat]
        });
      } else {
        console.warn(`No response for current location of ${this.props.name}`);
      }
    });
  }

  render() {
    if (!this.state.currentPosition.length) return null;
    return (
      <MapboxPopup
        anchor={'bottom'}
        coordinates={this.state.currentPosition}
        className={`mapboxgl-popup mapboxgl-popup-anchor-bottom ${slug(this.props.name, { lower: true })}`}
      >
        <img src='/assets/bus-tracker-icon.png' />
        <img src='/assets/bus-icon-small.png' />
      </MapboxPopup>
    );
  }
}
