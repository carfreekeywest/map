import React, { Component } from 'react';

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
      <div>
        <div className='menu-button' onClick={this.toggle.bind(this)}>
          <div className='menu-button-bar'></div>
          <div className='menu-button-bar'></div>
          <div className='menu-button-bar'></div>
        </div>

        { this.state.open &&
          <div className='menu'>
            <div className='menu-close' onClick={this.toggle.bind(this)}>✕</div>
            <div className='menu-header'>
              <img className='menu-tagline' src='/assets/tagline.png' />
            </div>
            <div className='menu-links'>
              <ul>
                <li><a href='https://www.carfreekeywest.com/about-us'>about</a></li>
                <li><a href='https://www.carfreekeywest.com/safety'>safety</a></li>
                <li><a href='https://www.carfreekeywest.com/contact-us'>contact</a></li>
              </ul>
            </div>
            <div className='menu-footer'>
              <img className='menu-icons' src='/assets/large-icons.png' />
            </div>
          </div>
        }
      </div>
    );
  }
}
