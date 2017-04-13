import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import BikeMap from './components/BikeMap';

export default function() {
  return (
    <Router>
      <div className='app'>
        <Route path='/' component={BikeMap} />
      </div>
    </Router>
  );
}
