import React from 'react';

export default function({ hide }) {
  return (
    <div className='legend'>
      Legend
      <a className='legend-close' onClick={() => hide()}>x</a>
      <ul className='legend-lane-types'>
        <li className='lane-type'>
          <div className='lane-type-name'>Bike Routes</div>
          <div className='lane-type-description'>Designated or recommended streets for bike travel</div>
          <div className='lane-type-symbol bike-route'></div>
        </li>
        <li className='lane-type'>
          <div className='lane-type-name'>Bike Lanes</div>
          <div className='lane-type-description'>Designated on-street lane for bikes</div>
          <div className='lane-type-symbol bike-lane'></div>
        </li>
        <li className='lane-type'>
          <div className='lane-type-name'>Bike Trails</div>
          <div className='lane-type-description'>Separate path away from main roads for bikes and pedestrians</div>
          <div className='lane-type-symbol bike-trail'></div>
        </li>
      </ul>
    </div>
  );
}
