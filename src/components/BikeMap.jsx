import Legend from './Legend';
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
      legendShown: false,
      map: null,
      mouseOverClickable: false
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

  onMouseMove(map, event) {
    const features = map.queryRenderedFeatures(event.point, { layers: ['poi-cfkw'] });
    if (!features.length && this.state.mouseOverClickable) {
      this.setState({ mouseOverClickable: false });
    } else if (features.length) {
      this.setState({ mouseOverClickable: true });
    }
  }

  onStyleLoad(map, event) {
    this.setState({ map: map });
  }

  hideLegend() {
    this.setState({ legendShown: false });
  }

  showLegend() {
    this.setState({ legendShown: true });
  }

  render() {
    return (
      <div className={'map-page' + (this.state.mouseOverClickable ? ' hover' : '')}>
        <ReactMapboxGl
          style='mapbox://styles/sfcs/cj02u9vhn001r2slf71e52bna'
          accessToken='pk.eyJ1Ijoic2ZjcyIsImEiOiJjaXpmd3g2Z3cwMGk5MnhueWk4MXczbmFvIn0.emD101q5RMoUNMrQCQLYbw'
          center={[-81.778836, 24.558053]}
          zoom={[13]}
          minZoom={11}
          maxBounds={[[-81.94, 24.49], [-81.61, 24.64]]}
          containerStyle={{
            height: 'calc(100vh - 60px)',
            width: '100%'
          }}
          onClick={this.onClick.bind(this)}
          onMouseMove={this.onMouseMove.bind(this)}
          onStyleLoad={this.onStyleLoad.bind(this)}
        >
          <ZoomControl />
        </ReactMapboxGl>

        <a className='legend-button' onClick={this.showLegend.bind(this)}>legend</a>

        { this.state.legendShown ? (
          <Legend hide={this.hideLegend.bind(this)} />
        ) : '' }

        <Route path={`${this.props.match.url}poi/:name/:id`} render={props => (
          <Popup map={this.state.map} layer='poi-cfkw' {...props} />
        )}/>
      </div>
    );
  }
}

export default withRouter(BikeMap);
