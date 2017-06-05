import React, { Component, PropTypes } from 'react';

export default class BusMenu extends Component {
  static propTypes = {
    buses: PropTypes.array.isRequired,
    selectedBuses: PropTypes.array.isRequired,
    toggleBus: PropTypes.func.isRequired,
    hide: PropTypes.func.isRequired
  };

  render() {
    return (
      <div className='bus-menu'>
        <div className='bus-menu-header'>
          Show current location of bus
        </div>
        {this.props.buses.map(bus => {
          return (
            <div key={bus.name} className='bus-menu-item'>
              <label>
                <input type='checkbox'
                  checked={this.props.selectedBuses.indexOf(bus.name) >= 0}
                  onChange={(e) => this.props.toggleBus(bus.name, e)}
                />
                {bus.name}
              </label>
            </div>
          );
        })}
      </div>
    );
  }
}
