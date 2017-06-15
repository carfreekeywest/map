import Legend from './Legend';
import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import { Route } from 'react-router-dom';
import ReactMapboxGl, { Feature, GeoJSONLayer, Layer, Popup as MapboxPopup, ZoomControl } from 'react-mapbox-gl';
import turfBboxPolygon from '@turf/bbox-polygon';
import turfCircle from '@turf/circle';
import turfDestination from '@turf/destination';
import turfInside from '@turf/inside';
import turfMidpoint from '@turf/midpoint';
import { lineString as turfLineString, point as turfPoint } from '@turf/helpers';
import BusMarker from './BusMarker';
import BusMenu from './BusMenu';
import Popup from './Popup';
import { getBuses } from '../services/bus';
import { busRouteLayerNames } from '../config';

const routeLayerLabels = {
  'bike-lanes': 'Bike Lane',
  'bike-routes': 'Bike Route',
  'bike-trails-background': 'Bike Trail',
  'bike-trails-dashes': 'Bike Trail'
};

const bounds = [24.49, -81.94, 24.64, -81.61];
const boundsBbox = turfBboxPolygon(bounds);

class BikeMap extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      buses: [],
      busMenuOpen: false,
      busRoutesEnabled: true,
      center: [-81.778836, 24.558053],
      currentPosition: null,
      currentPositionRadius: null,
      currentPositionRadiusEnabled: false,
      currentPositionRadiusLine: null,
      currentPositionRadiusLineMidpoint: null,
      legendShown: false,
      map: null,
      mouseOverClickable: false,
      routePopup: null,
      routePopupCoordinates: null,
      selectedBuses: [],
      zoom: [13]
    };
  }

  componentWillMount() {
    if (!this.state.buses.length) {
      this.getBusRoutes();
    }

    this.watchPositionId = navigator.geolocation.watchPosition(position => {
      let coords = [position.coords.longitude, position.coords.latitude];
      let point = turfPoint(coords);

      // If point outside of keywest, fall back to default
      if (!turfInside(point, boundsBbox)) {
        coords = [-81.802118, 24.554755];
        point = turfPoint(coords);
      }
      const buffer = turfCircle(point, 1, 64, 'miles');
      const endPoint = turfDestination(point, 1, 90, 'miles');
      const bufferLine = turfLineString([coords, endPoint.geometry.coordinates]);
      const bufferLineMidpoint = turfMidpoint(point, endPoint);

      this.setState({
        currentPosition: coords,
        currentPositionRadius: buffer,
        currentPositionRadiusLine: bufferLine,
        currentPositionRadiusLineMidpoint: bufferLineMidpoint
      });
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchPositionId);
  }

  onClick(map, event) {
    const features = map.queryRenderedFeatures(event.point, {
      layers: ['poi-cfkw'].concat(Object.keys(routeLayerLabels))
    });
    if (!features.length) {
      this.deselectFeature();
      return;
    }

    const feature = features[0];

    if (feature.layer.id === 'poi-cfkw') {
      this.setState({
        routePopup: null,
        routePopupCoordinates: null
      });
      this.props.history.push(`/poi/${feature.properties.NAME}/${feature.id}`);
    } else if (routeLayerLabels[feature.layer.id]) {
      this.setState({
        routePopupCoordinates: [event.lngLat.lng, event.lngLat.lat],
        routePopup: routeLayerLabels[feature.layer.id]
      });
    }
  }

  onMouseMove(map, event) {
    const features = map.queryRenderedFeatures(event.point, { layers: ['poi-cfkw'] });
    if (!features.length && this.state.mouseOverClickable) {
      this.setState({ mouseOverClickable: false });
    } else if (features.length) {
      this.setState({ mouseOverClickable: true });
    }
  }

  onStyleLoad(map, event) {
    map.loadImage('/assets/1mile-bike-walk.png', (error, image) => {
      if (error) throw error;
      map.addImage('1mile-bike-walk', image);
    });
    this.setState({ map });
  }

  getBusRoutes() {
    getBuses(buses => {
      this.setState({ buses });
    });
  }

  deselectFeature() {
    this.props.history.push('/');
    this.setState({
      routePopup: null,
      routePopupCoordinates: null
    });
  }

  centerOnFeature(feature) {
    this.setState({
      center: feature.geometry.coordinates,
      zoom: [15]
    });
  }

  toggleBusRoutes(value) {
    const busRoutesEnabled = (value === undefined) ? !this.state.busRoutesEnabled : value;
    const visibility = busRoutesEnabled ? 'visible' : 'none';
    busRouteLayerNames.forEach(layer => {
      this.state.map.setLayoutProperty(layer, 'visibility', visibility);
    });
    this.setState({ busRoutesEnabled });
  }

  hideLegend() {
    this.setState({ legendShown: false });
  }

  showLegend() {
    this.setState({ legendShown: true });
  }

  hideBusMenu() {
    this.setState({ busMenuOpen: false });
  }

  showBusMenu() {
    this.setState({ busMenuOpen: true });
  }

  render() {
    return (
      <div className={'map-page' + (this.state.mouseOverClickable ? ' hover' : '')}>
        <ReactMapboxGl
          style='mapbox://styles/sfcs/cj02u9vhn001r2slf71e52bna'
          accessToken='pk.eyJ1Ijoic2ZjcyIsImEiOiJjaXpmd3g2Z3cwMGk5MnhueWk4MXczbmFvIn0.emD101q5RMoUNMrQCQLYbw'
          center={this.state.center}
          zoom={this.state.zoom}
          minZoom={11}
          maxBounds={[[bounds[1], bounds[1]], [bounds[3], bounds[2]]]}
          containerStyle={{
            height: 'calc(100vh - 60px)',
            width: '100%'
          }}
          onClick={this.onClick.bind(this)}
          onMouseMove={this.onMouseMove.bind(this)}
          onStyleLoad={this.onStyleLoad.bind(this)}
        >
          <ZoomControl />

          { (this.state.currentPositionRadiusEnabled && this.state.currentPositionRadius) ? (
            <GeoJSONLayer
              before='current-location'
              data={this.state.currentPositionRadius}
              circleLayout={{ visibility: 'none' }}
              fillPaint={{ 'fill-opacity': 0.2, 'fill-color': '#3FAADC' }}
              lineLayout={{ visibility: 'none' }}
            />
          ) : '' }

          { (this.state.currentPositionRadiusEnabled && this.state.currentPositionRadiusLine) ? (
            <GeoJSONLayer
              before='current-location'
              circleLayout={{ visibility: 'none' }}
              data={this.state.currentPositionRadiusLine}
              fillPaint={{ 'fill-color': '#FFFFFF' }}
            />
          ) : '' }

          { (this.state.currentPositionRadiusEnabled && this.state.currentPositionRadiusLineMidpoint) ? (
            <GeoJSONLayer
              before='current-location'
              data={this.state.currentPositionRadiusLineMidpoint}
              symbolLayout={{
                'icon-image': '1mile-bike-walk',
                'icon-offset': [0, -10],
                'icon-size': 0.9
              }}
            />
          ) : '' }

          { this.state.currentPosition ? (
            <Layer
              id='current-location'
              type='circle'
              paint={{
                'circle-radius': 5,
                'circle-color': '#0F7BBC',
                'circle-opacity': 0.8,
                'circle-stroke-width': 1,
                'circle-stroke-color': 'white'
              }}>
              <Feature coordinates={this.state.currentPosition} />
            </Layer>
          ) : '' }

          { this.state.routePopup ? (
            <MapboxPopup anchor={'bottom'} coordinates={this.state.routePopupCoordinates}>
              {this.state.routePopup}
            </MapboxPopup>
          ) : '' }

          { this.state.selectedBuses.map(selectedBusName => {
            const selectedBus = this.state.buses.filter(b => b.name === selectedBusName)[0];
            if (!selectedBus) return '';
            return (
              <BusMarker key={selectedBus.shortName} {...selectedBus} />
            );
          })}
        </ReactMapboxGl>

        <a className='legend-button' onClick={this.showLegend.bind(this)}>legend</a>

        { this.state.legendShown ? (
          <Legend
            hide={this.hideLegend.bind(this)}
            busRoutesEnabled={this.state.busRoutesEnabled}
            toggleBusRoutes={this.toggleBusRoutes.bind(this)}
          />
        ) : '' }

        { this.state.busMenuOpen ? (
          <BusMenu
            hide={this.hideBusMenu.bind(this)}
            buses={this.state.buses}
            selectedBuses={this.state.selectedBuses}
            toggleBus={(bus) => {
              const busIndex = this.state.selectedBuses.indexOf(bus);
              const newSelectedBuses = this.state.selectedBuses.slice();
              if (busIndex >= 0) {
                newSelectedBuses.splice(busIndex, 1);
              } else {
                newSelectedBuses.push(bus);
              }
              this.setState({ selectedBuses: newSelectedBuses });
            }}
          />
        ) : '' }

        <footer>
          <div className='bottom-buttons'>
            <a className='scale-button' onClick={() => {
              this.setState(prevState => {
                return {
                  currentPositionRadiusEnabled: !prevState.currentPositionRadiusEnabled
                };
              });
            }}>
              <img src={`/assets/scale-icon${this.state.currentPositionRadiusEnabled ? '-enabled' : ''}.png`} />
            </a>

            <a className='bus-button' onClick={() => {
              if (this.state.busMenuOpen) this.hideBusMenu();
              else this.showBusMenu();
            }}>
              <img src={`/assets/bus-icon${this.state.busMenuOpen ? '-enabled' : ''}.png`} />
            </a>
          </div>
        </footer>

        <Route path={`${this.props.match.url}poi/:name/:id`} render={props => (
          <Popup map={this.state.map} layer='poi-cfkw' centerOnFeature={this.centerOnFeature.bind(this)} close={this.deselectFeature.bind(this)} {...props} />
        )}/>
      </div>
    );
  }
}

export default withRouter(BikeMap);
