import React, { Component } from 'react';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Content from '../Content';


import '../../assets/stylesheets/bootstrap.scss';
import './layout.css';

class Layout extends Component {
  render() {
    return <div className="layout">
      <Header />
      <Content>
        {this.props.children}
      </Content>
      <Footer />
      <div className="clearfix"></div>
    </div>;
  }
}

export default Layout;
