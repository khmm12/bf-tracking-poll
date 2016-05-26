import React, { Component, PropTypes } from 'react';


class Smile extends Component {
  static propTypes = {
    mood: PropTypes.oneOf(['happy', 'almosthappy', 'neutral', 'notsoangry', 'angry']).isRequired,
  }

  render() {
    const { mood } = this.props;
    const url = require(`./smiles/` + mood + `.svg`);
    return <img src={url} {...this.props} />;
  }
}

export default Smile;
