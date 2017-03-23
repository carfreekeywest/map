import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Source } from 'react-mapbox-gl';
import request from 'superagent';

export default class BikeMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartoLayerUrl: null,
      layerGroupId: null
    };

    const cartoDomain = 'sfcs.carto.com';
    const layerConfig = {
      version: '1.4.0',
      layers: [
        {
          type: 'cartodb',
          options: {
            sql: 'SELECT * FROM bike_lanes',
            cartocss: '#layer { line-width: 1; line-color: #000; }',
            cartocss_version: '2.1.1'
          }
        }
      ]
    };

    request
      .post(`https://${cartoDomain}/api/v1/map`)
      .send(layerConfig)
      .end((err, response) => {
        const parsedResponse = JSON.parse(response.text);
        console.log(parsedResponse);
        const layerGroupId = parsedResponse.layergroupid;
        this.setState({
          cartoLayerUrl: `https://${cartoDomain}/api/v1/map/${layerGroupId}/{z}/{x}/{y}.mvt`,
          layerGroupId
        });
      });
  }

  // TODO carto doesn't support v2, so maybe we just put everything in mapbox?!

  render() {
    return (
      <ReactMapboxGl
        style='mapbox://styles/sfcs/cj02u9vhn001r2slf71e52bna'
        accessToken='pk.eyJ1Ijoic2ZjcyIsImEiOiJjaXpmd3g2Z3cwMGk5MnhueWk4MXczbmFvIn0.emD101q5RMoUNMrQCQLYbw'
        center={[-81.778836, 24.558053]}
        zoom={[13]}
        onMouseMove={(map, event) => {
          /*
          console.log('mouse move');
          const features = map.queryRenderedFeatures(event.point, { layers: ['bike_lanes'] });
          console.log('over', features);
          if (features.length) {
              map.setFilter("state-fills-hover", ["==", "name", features[0].properties.name]);
          } else {
              map.setFilter("state-fills-hover", ["==", "name", ""]);
          }
          */
        }}
        containerStyle={{
          height: '100vh',
          width: '100vw'
        }}
      >
          { this.state.cartoLayerUrl ? (
            <Source id='bike_lanes_source' tileJsonSource={{
              tiles: [ this.state.cartoLayerUrl ],
              type: 'vector'
            }} />
          ) : '' }
          { this.state.cartoLayerUrl ? (
            <Layer type='line' id='bike_lanes' sourceId='bike_lanes_source'
              before='military-areas-labels'
              layerOptions={{
                'source-layer': 'layer0'
              }}
              paint={{
                'line-color': '#000',
                'line-opacity': 1,
                'line-width': 5
              }}
            />
          ) : '' }
      </ReactMapboxGl>
    );
  }
}
