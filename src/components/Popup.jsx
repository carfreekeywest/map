import React, { Component, PropTypes } from 'react';

function Popup({ feature }) {
  return (
    <div className='popup'>
      {!feature ? 'Not found' : (
        <div>
          {feature.properties.NAME},
          {feature.properties.ADDRESS}
        </div>
      )}
    </div>
  );
}

export default class PopupContainer extends Component {
  static propTypes = {
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

  findFeatureIfNeeded(props) {
    const name = props.match.params.name;
    const id = parseInt(props.match.params.id, 10);
    if (props.map) {
      if (!props.map.loaded()) {
        props.map.on('load', () => {
          this.setState(() => {
            return {
              feature: this.findFeature(props.layer, name, id)
            };
          });
        });
      } else {
        this.setState(() => {
          return {
            feature: this.findFeature(props.layer, name, id)
          };
        });
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
    return <Popup feature={this.state.feature} />;
  }
}
