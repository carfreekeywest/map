import React from 'react';
import { GeoJSONLayer } from 'react-mapbox-gl';

export default function FeatureHighlight({ feature }) {
  if (!feature) return null;
  return (
    <GeoJSONLayer
      before='poi-cfkw'
      data={feature.geometry}
      type='circle'
      circlePaint={{
        'circle-color': '#ED247C',
        'circle-radius': 20,
        'circle-opacity': 0.3
      }}
    />
  );
}
