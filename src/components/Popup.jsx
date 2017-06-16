import React, { Component, PropTypes } from 'react';

function Popup({ close, feature }) {
  return (
    <div className='popup'>
      {!feature ? 'Not found' : (
        <div>
          <a className='popup-close' onClick={close}>✕</a>
          <h2>
            {feature.properties.NAME}
          </h2>
          <div className='popup-inner'>
          </div>
        </div>
      )}
    </div>
  );
}

export default class PopupContainer extends Component {
  static propTypes = {
    close: PropTypes.func.isRequired,
    layer: PropTypes.string.isRequired,
    map: PropTypes.object,
    match: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      feature: null
    };
  }

  componentWillMount() {
    this.findFeatureIfNeeded(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.findFeatureIfNeeded(nextProps);
  }

  setFeature(layer, name, id) {
    const feature = this.findFeature(layer, name, id);
    this.setState(() => {
      return { feature };
    });
  }

  findFeatureIfNeeded(props) {
    const name = props.match.params.name;
    const id = parseInt(props.match.params.id, 10);
    if (props.map && (!this.state.feature || name !== this.props.match.params.name)) {
      if (!props.map.loaded()) {
        props.map.on('load', () => this.setFeature(props.layer, name, id));
      } else {
        this.setFeature(props.layer, name, id);
      }
    }
  }

  findFeature(layer, name, id) {
    const features = this.props.map.queryRenderedFeatures({
      layers: [layer],
      filter: ['==', 'NAME', name]
    }).filter(feature => feature.id === id);
    return features[0];
  }

  render() {
    return <Popup close={this.props.close} feature={this.state.feature} />;
  }
}
