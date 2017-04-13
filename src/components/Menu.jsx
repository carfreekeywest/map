import React, { Component } from 'react';

function ExpandedMenu() {
  return (
    <div className='menu-expanded'>
      <ul>
        <li>about</li>
        <li>safety</li>
        <li>contact</li>
      </ul>
    </div>
  );
}

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  close() {
    this.setState({ open: false });
  }

  open() {
    this.setState({ open: true });
  }

  toggle() {
    this.setState(prevState => {
      return {
        open: !prevState.open
      };
    });
  }

  render() {
    return (
      <div className='menu'>
        <div className='menu-header'>
          <div className='menu-branding'>car free key west</div>
          <div className='menu-button' onClick={this.toggle.bind(this)}></div>
        </div>
        { this.state.open ? <ExpandedMenu/> : ''}
      </div>
    );
  }
}
