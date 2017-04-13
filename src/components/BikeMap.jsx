import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import { Route } from 'react-router-dom';
import ReactMapboxGl, { ZoomControl } from 'react-mapbox-gl';
import Popup from './Popup';

class BikeMap extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      map: null
    };
  }

  onClick(map, event) {
    const features = map.queryRenderedFeatures(event.point, { layers: ['poi-cfkw'] });
    if (features.length) {
      const feature = features[0];
      this.props.history.push(`/poi/${feature.properties.NAME}/${feature.id}`);
    } else {
      this.props.history.push('/');
    }
  }

  onStyleLoad(map, event) {
    this.setState({ map: map });
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
          onStyleLoad={this.onStyleLoad.bind(this)}
        >
          <ZoomControl />
        </ReactMapboxGl>

        <Route path={`${this.props.match.url}poi/:name/:id`} render={props => (
          <Popup map={this.state.map} layer='poi-cfkw' {...props} />
        )}/>
      </div>
    );
  }
}

export default withRouter(BikeMap);
