import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import queryString from 'query-string';
import BikeMap from './components/BikeMap';
import Logo from './components/Logo';
import Menu from './components/Menu';

export default function() {
  const embed = (queryString.parse(window.location.search).embed === 'yes');
  return (
    <Router>
      <div className={'app' + (embed ? ' embed' : '')}>
        <Menu />
        <Logo />
        <Route path='/' component={BikeMap} />
      </div>
    </Router>
  );
}
