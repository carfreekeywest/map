import React from 'react';

export default function({ hide }) {
  return (
    <div className='legend'>
      Legend
      <a className='legend-close' onClick={() => hide()}>x</a>
      <ul>
        <li>bike routes</li>
        <li>bike lanes</li>
        <li>bike trails</li>
      </ul>
    </div>
  );
}
