import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import range from 'lodash/range';

import './pollQuestion.css';

class PollQuestion extends Component {
  static propTypes = {
    question: PropTypes.string.isRequired,
    stars: PropTypes.shape({
      value: PropTypes.number.isRequired,
      onChange: PropTypes.func.isRequired,
    }).isRequired,
    comment: PropTypes.shape({
      value: PropTypes.string.isRequired,
      onChange: PropTypes.func.isRequired,
    }).isRequired,
  };

  render() {
    const { question, stars, comment } = this.props;
    return (
      <div className="poll-question">
        <h4 className="poll-question__question">
          {question}
        </h4>
        <StarSlider className="poll-question__slider" {...stars} />
        {stars.value > 0 && stars.value < 3 ?
          <textarea className="poll-question__input form-control" {...comment} />
        : null}
      </div>
    );
  }
}

const StarSlider = ({ value, onChange }) => (
  <div className="poll-question__slider poll-question__stars">
    <div className="poll-question__stars-slider">
      {range(1, 6).map(number =>
        <Star
          key={number}
          pseudoActive={value > 0 && number < value}
          active={value === number}
          onClick={() => onChange(number)}
        />)
      }
    </div>
    <div className="poll-question__captions">
      <span>Disagree</span>
      <span>Agree</span>
      <div className="clearfix"></div>
    </div>
  </div>
)

//
const Star = ({ active, pseudoActive, onClick }) => {
  const classes = classnames({
    'stars-slider__star': true,
    'stars-slider__star--active': active,
    'stars-slider__star--pseaudo-active': pseudoActive,
  });
  let url = null;
  if (active) {
    url = require('./white_star.svg');
  } else if (pseudoActive) {
    url = require('./yellow_star.svg');
  } else {
    url = require('./star.svg');
  }
  return (
    <div className={classes} onClick={onClick}>
      <img src={url} />
    </div>
  );
};

export default PollQuestion;
