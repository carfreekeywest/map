import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GeoJSONLayer } from 'react-mapbox-gl';
import { lineString as turfLineString, point as turfPoint } from '@turf/helpers';
import turfCircle from '@turf/circle';
import turfDestination from '@turf/destination';

export default class CurrentPositionRadius extends Component {
  static propTypes = {
    position: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      buffer: null,
      line: null
    };
  }

  componentWillMount() {
    this.update(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.update(nextProps);
  }

  update(props) {
    const coords = props.position;
    const point = coords ? turfPoint(coords) : null;
    const buffer = point ? turfCircle(point, 1, 64, 'miles') : null;
    const endPoint = point ? turfDestination(point, 1, 90, 'miles') : null;
    const line = coords && endPoint ? turfLineString([coords, endPoint.geometry.coordinates]) : null;

    this.setState({ buffer, line });
  }

  render() {
    return (
      <div>
        { this.state.buffer ? (
          <GeoJSONLayer
            before='current-location-shadow'
            data={this.state.buffer}
            circleLayout={{ visibility: 'none' }}
            fillPaint={{ 'fill-opacity': 0.6, 'fill-color': '#3FAADC' }}
            lineLayout={{ visibility: 'none' }}
          />
        ) : '' }

        { this.state.line ? (
          <GeoJSONLayer
            before='current-location-shadow'
            circleLayout={{ visibility: 'none' }}
            data={this.state.line}
            linePaint={{ 'line-color': '#FFFFFF', 'line-width': 5 }}
          />
        ) : '' }
      </div>
    );
  }
}

