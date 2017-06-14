import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import BikeMap from './components/BikeMap';
import Logo from './components/Logo';
import Menu from './components/Menu';

export default function() {
  return (
    <Router>
      <div className='app'>
        <Menu />
        <Logo />
        <Route path='/' component={BikeMap} />
      </div>
    </Router>
  );
}
