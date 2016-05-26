import React from 'react';

import './header.css';

const Header = () => (
  <header className="header">
    <a href="https://support.butterfly.ai" target="_blank" className="header__logo">
      <img src={require('./butterfly.svg')} />
    </a>
    <div className="header__brand">Butterfly Inc.</div>
  </header>
);


export default Header;
