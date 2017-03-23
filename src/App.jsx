import React, {Component} from 'react';
import BikeMap from './components/BikeMap';
import Legend from './components/Legend';

export default class App extends Component {
  render() {
    return (
      <div className='app'>
        <BikeMap />
        <Legend />
      </div>
    );
  }
}
