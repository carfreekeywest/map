import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class BusMenu extends Component {
  static propTypes = {
    buses: PropTypes.array.isRequired,
    selectedBuses: PropTypes.array.isRequired,
    toggleBus: PropTypes.func.isRequired,
    hide: PropTypes.func.isRequired
  };

  renderBusItem(bus) {
    const { selectedBuses, toggleBus } = this.props;
    return (
      <div key={bus.name} className='bus-menu-item'>
        <label>
          <input type='checkbox'
            checked={selectedBuses.indexOf(bus.name) >= 0}
            onChange={(e) => toggleBus(bus.name, e)}
          />
          <span className={`bus-menu-label ${bus.name}`} style={{ backgroundColor: bus.color }}>
            {bus.name}
          </span>
        </label>
      </div>
    );
  }

  render() {
    const { buses, hide } = this.props;
    return (
      <div className='bus-menu'>
        <div className='bus-menu-header'>
          Live bus locations
          <a className='bus-menu-close' onClick={hide}>✕</a>
        </div>
        <div className='bus-menu-body'>
          <div className='bus-menu-left'>
            {buses.slice(0, buses.length / 2).map(bus => this.renderBusItem(bus))}
          </div>
          <div className='bus-menu-right'>
            {buses.slice(buses.length / 2, buses.length).map(bus => this.renderBusItem(bus))}
          </div>
          <div className='clearfix'></div>
        </div>
      </div>
    );
  }
}
