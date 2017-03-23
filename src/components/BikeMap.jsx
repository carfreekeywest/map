import React, { Component } from 'react';
import ReactMapboxGl, { ZoomControl } from 'react-mapbox-gl';

export default class BikeMap extends Component {
  constructor(props) {
    super(props);
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
        >
          <ZoomControl />
        </ReactMapboxGl>
      </div>
    );
  }
}
