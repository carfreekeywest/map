import React from 'react';

export default function({ hide, busRoutesEnabled, toggleBusRoutes }) {
  return (
    <div className='legend'>
      <div className='legend-header'>
        Legend
      </div>
      <a className='legend-close' onClick={() => hide()}>✕</a>
      <div className='legend-body'>
        <ul className='legend-lane-types'>
          <li className='lane-type'>
            <div className='lane-type-name'>Bike Route</div>
            <div className='lane-type-description'>Designated or recommended streets for bike travel</div>
            <div className='lane-type-symbol bike-route'></div>
          </li>
          <li className='lane-type'>
            <div className='lane-type-name'>Bike Lane</div>
            <div className='lane-type-description'>Designated on-street lane for bikes</div>
            <div className='lane-type-symbol bike-lane'></div>
          </li>
          <li className='lane-type'>
            <div className='lane-type-name'>Off-Street Trail</div>
            <div className='lane-type-description'>Separate path away from main roads for bikes and pedestrians</div>
            <div className='lane-type-symbol bike-trail'></div>
          </li>
          <li className='lane-type'>
            <div className='lane-type-name'>Duval Loop</div>
            <div className='lane-type-description'>
              <div>Free shuttle, runs every 15 minutes 6am to midnight!</div>
              <div>In season: 7 days per week</div>
              <div>Off season: Thursday - Sunday</div>
            </div>
            <div className='lane-type-symbol duval-loop'></div>
          </li>
          <li className='lane-type'>
            <div className='lane-type-name'>Key West Transit Bus Routes</div>
            <div className='lane-type-description'>
              <div>Earliest routes begin at 5:30am and run as late as midnight. <a href='http://kwtransit.com'>Visit kwtransit.com</a> for details</div>
            </div>
            <div className='lane-type-symbol bus-route'></div>
            <div className='bus-route-toggle'>
              <label>
                <input type='checkbox'
                  onChange={() => toggleBusRoutes()}
                  checked={busRoutesEnabled}
                />
                Show bus routes (hides bike lanes)
              </label>
            </div>
          </li>
          <li className='lane-type'>
            <div className='lane-type-name'>Harbor Walk</div>
            <div className='lane-type-symbol harbor-walk'></div>
          </li>
        </ul>
      </div>
    </div>
  );
}
