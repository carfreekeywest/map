import React, { Component } from 'react';
import ReactMapboxGl, { Popup, ZoomControl } from 'react-mapbox-gl';

export default class BikeMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popupFeature: null,
      popupLngLat: null
    };
  }

  onClick(map, event) {
    let feature = null;
    let lnglat = null;

    const features = map.queryRenderedFeatures(event.point, { layers: ['poi-cfkw'] });
    if (features.length) {
      feature = features[0];
      lnglat = [event.lngLat.lng, event.lngLat.lat];
    }
    this.setState(prevState => {
      return {
        popupFeature: feature,
        popupLngLat: lnglat
      };
    });
  }

  render() {
    return (
      <div className='map-page'>
        <ReactMapboxGl
          style='mapbox://styles/sfcs/cj02u9vhn001r2slf71e52bna'
          accessToken='pk.eyJ1Ijoic2ZjcyIsImEiOiJjaXpmd3g2Z3cwMGk5MnhueWk4MXczbmFvIn0.emD101q5RMoUNMrQCQLYbw'
          center={[-81.778836, 24.558053]}
          zoom={[13]}
          containerStyle={{
            height: '100vh',
            width: '100vw'
          }}
          onClick={this.onClick.bind(this)}
        >
          <ZoomControl />
          { this.state.popupFeature ? (
            <Popup anchor='bottom' coordinates={this.state.popupLngLat}>
              {this.state.popupFeature.properties.NAME}
              {this.state.popupFeature.properties.NAME}
            </Popup>
          ) : null }
        </ReactMapboxGl>
      </div>
    );
  }
}
