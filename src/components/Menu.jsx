import React, { Component } from 'react';

const BASE_URL = 'https://www.carfreekeywest.com/';

const ITEMS = [
  { label: 'about', url: 'about-us' },
  { label: 'duval loop', url: 'duval-loop' },
  { label: 'bike', url: 'bike' },
  { label: 'walk', url: 'walk' },
  { label: 'safety', url: 'safety' },
  { label: 'partners', url: 'partners' },
  { label: 'maps', url: 'maps' },
  { label: 'contact', url: 'contact-us' }
];

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

  renderMenuItem(label, url) {
    return (
      <li key={url}>
        <a href={BASE_URL + url}>{label}</a>
      </li>
    );
  }

  render() {
    return (
      <div>
        <div className='menu-button' onClick={this.toggle.bind(this)}>
          <div className='menu-button-bar'></div>
          <div className='menu-button-bar'></div>
          <div className='menu-button-bar'></div>
        </div>

        <div className={'menu' + (this.state.open ? ' is-open' : '')}>
          <div className='menu-close' onClick={this.toggle.bind(this)}>✕</div>
          <div className='menu-header'>
            <img className='menu-tagline' src='/assets/tagline.png' />
          </div>
          <div className='menu-links'>
            <ul>
              {ITEMS.map(item => this.renderMenuItem(item.label, item.url))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
