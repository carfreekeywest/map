import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import BikeMap from './components/BikeMap';
import Menu from './components/Menu';

export default function() {
  return (
    <Router>
      <div className='app'>
        <Menu />
        <Route path='/' component={BikeMap} />
      </div>
    </Router>
  );
}
